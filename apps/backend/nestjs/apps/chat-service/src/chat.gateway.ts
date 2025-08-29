import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  WS_EVENTS,
  SERVICE_NAMES,
  MESSAGE_PATTERNS,
  WsJwtGuard,
  IJwtPayload,
  IServiceResponse,
  IMessage,
  ISendMessageRequest,
  IJoinRoomRequest,
  ILeaveRoomRequest,
} from '@shared';

interface AuthenticatedSocket extends Socket {
  user?: IJwtPayload;
}

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);
  private connectedUsers = new Map<string, AuthenticatedSocket>();

  constructor(
    @Inject(SERVICE_NAMES.CHAT_SERVICE)
    private readonly chatClient: ClientProxy,
    @Inject(SERVICE_NAMES.AUTH_SERVICE)
    private readonly authClient: ClientProxy,
  ) {}

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway initialized');
  }

  async handleConnection(client: AuthenticatedSocket) {
    try {
      this.logger.log(`Client attempting to connect: ${client.id}`);
      
      // Extract token from handshake
      const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1];
      
      if (!token) {
        this.logger.warn(`Client ${client.id} connected without token`);
        client.disconnect(true);
        return;
      }

      // Validate token with auth service
      const validationResult = await firstValueFrom(
        this.authClient.send(MESSAGE_PATTERNS.AUTH.VALIDATE_TOKEN, { token }),
      );

      if (!validationResult.valid) {
        this.logger.warn(`Client ${client.id} connected with invalid token`);
        client.disconnect(true);
        return;
      }

      // Store user info in socket
      client.user = validationResult.payload;
      this.connectedUsers.set(client.user.sub, client);

      this.logger.log(`User ${client.user.username} (${client.user.sub}) connected with socket ${client.id}`);
      
      // Emit connection success
      client.emit(WS_EVENTS.CONNECTION, {
        success: true,
        message: 'Connected successfully',
        user: client.user,
      });

    } catch (error) {
      this.logger.error(`Connection error for client ${client.id}: ${error.message}`);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    if (client.user) {
      this.connectedUsers.delete(client.user.sub);
      this.logger.log(`User ${client.user.username} (${client.user.sub}) disconnected`);
    } else {
      this.logger.log(`Anonymous client ${client.id} disconnected`);
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage(WS_EVENTS.JOIN_ROOM)
  async handleJoinRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    try {
      const joinRequest: IJoinRoomRequest = {
        roomId: data.roomId,
        userId: client.user.sub,
      };

      const result: IServiceResponse = await firstValueFrom(
        this.chatClient.send(MESSAGE_PATTERNS.CHAT.JOIN_ROOM, joinRequest),
      );

      if (!result.success) {
        client.emit(WS_EVENTS.ERROR, {
          event: WS_EVENTS.JOIN_ROOM,
          message: result.message,
        });
        return;
      }

      // Join socket room
      await client.join(data.roomId);
      
      // Notify user
      client.emit(WS_EVENTS.JOIN_ROOM, {
        success: true,
        roomId: data.roomId,
        message: 'Successfully joined room',
      });

      // Notify other users in the room
      client.to(data.roomId).emit(WS_EVENTS.USER_JOINED, {
        roomId: data.roomId,
        user: {
          id: client.user.sub,
          username: client.user.username,
          email: client.user.email,
        },
        message: `${client.user.username} joined the room`,
      });

      this.logger.log(`User ${client.user.username} joined room ${data.roomId}`);

    } catch (error) {
      this.logger.error(`Error joining room: ${error.message}`);
      client.emit(WS_EVENTS.ERROR, {
        event: WS_EVENTS.JOIN_ROOM,
        message: 'Failed to join room',
        error: error.message,
      });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage(WS_EVENTS.LEAVE_ROOM)
  async handleLeaveRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    try {
      const leaveRequest: ILeaveRoomRequest = {
        roomId: data.roomId,
        userId: client.user.sub,
      };

      const result: IServiceResponse = await firstValueFrom(
        this.chatClient.send(MESSAGE_PATTERNS.CHAT.LEAVE_ROOM, leaveRequest),
      );

      if (!result.success) {
        client.emit(WS_EVENTS.ERROR, {
          event: WS_EVENTS.LEAVE_ROOM,
          message: result.message,
        });
        return;
      }

      // Leave socket room
      await client.leave(data.roomId);
      
      // Notify user
      client.emit(WS_EVENTS.LEAVE_ROOM, {
        success: true,
        roomId: data.roomId,
        message: 'Successfully left room',
      });

      // Notify other users in the room
      client.to(data.roomId).emit(WS_EVENTS.USER_LEFT, {
        roomId: data.roomId,
        user: {
          id: client.user.sub,
          username: client.user.username,
          email: client.user.email,
        },
        message: `${client.user.username} left the room`,
      });

      this.logger.log(`User ${client.user.username} left room ${data.roomId}`);

    } catch (error) {
      this.logger.error(`Error leaving room: ${error.message}`);
      client.emit(WS_EVENTS.ERROR, {
        event: WS_EVENTS.LEAVE_ROOM,
        message: 'Failed to leave room',
        error: error.message,
      });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage(WS_EVENTS.MESSAGE)
  async handleMessage(
    @MessageBody() data: { roomId: string; content: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    try {
      if (!data.content || data.content.trim().length === 0) {
        client.emit(WS_EVENTS.ERROR, {
          event: WS_EVENTS.MESSAGE,
          message: 'Message content cannot be empty',
        });
        return;
      }

      const sendRequest: ISendMessageRequest = {
        chatRoomId: data.roomId,
        content: data.content.trim(),
        userId: client.user.sub,
      };

      const result: IServiceResponse<IMessage> = await firstValueFrom(
        this.chatClient.send(MESSAGE_PATTERNS.CHAT.SEND_MESSAGE, sendRequest),
      );

      if (!result.success) {
        client.emit(WS_EVENTS.ERROR, {
          event: WS_EVENTS.MESSAGE,
          message: result.message,
        });
        return;
      }

      // Broadcast message to all users in the room
      this.server.to(data.roomId).emit(WS_EVENTS.NEW_MESSAGE, {
        roomId: data.roomId,
        message: result.data,
        user: {
          id: client.user.sub,
          username: client.user.username,
          email: client.user.email,
        },
      });

      this.logger.log(`Message sent in room ${data.roomId} by ${client.user.username}`);

    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`);
      client.emit(WS_EVENTS.ERROR, {
        event: WS_EVENTS.MESSAGE,
        message: 'Failed to send message',
        error: error.message,
      });
    }
  }

  @SubscribeMessage('typing')
  async handleTyping(
    @MessageBody() data: { roomId: string; isTyping: boolean },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    try {
      // Broadcast typing status to other users in the room
      client.to(data.roomId).emit('user_typing', {
        roomId: data.roomId,
        user: {
          id: client.user.sub,
          username: client.user.username,
        },
        isTyping: data.isTyping,
      });

    } catch (error) {
      this.logger.error(`Error handling typing: ${error.message}`);
    }
  }

  // Helper method to send message to specific user
  sendToUser(userId: string, event: string, data: any) {
    const userSocket = this.connectedUsers.get(userId);
    if (userSocket) {
      userSocket.emit(event, data);
    }
  }

  // Helper method to send message to all users in a room
  sendToRoom(roomId: string, event: string, data: any) {
    this.server.to(roomId).emit(event, data);
  }

  // Helper method to get connected users count
  getConnectedUsersCount(): number {
    return this.connectedUsers.size;
  }

  // Helper method to check if user is online
  isUserOnline(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }
}