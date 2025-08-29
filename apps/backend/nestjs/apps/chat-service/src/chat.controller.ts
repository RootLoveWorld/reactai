import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import {
  MESSAGE_PATTERNS,
  IServiceResponse,
  IPaginatedResponse,
  IChatRoom,
  IMessage,
  ICreateRoomRequest,
  ISendMessageRequest,
  IJoinRoomRequest,
  ILeaveRoomRequest,
  PaginationOptions,
} from '@shared';

@Controller()
export class ChatController {
  private readonly logger = new Logger(ChatController.name);

  constructor(private readonly chatService: ChatService) {}

  @MessagePattern(MESSAGE_PATTERNS.CHAT.CREATE_ROOM)
  async createRoom(@Payload() data: ICreateRoomRequest): Promise<IServiceResponse<IChatRoom>> {
    try {
      this.logger.log(`Creating chat room: ${data.name}`);
      const room = await this.chatService.createRoom(data);
      
      return {
        success: true,
        message: 'Chat room created successfully',
        data: room,
      };
    } catch (error) {
      this.logger.error(`Failed to create chat room: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Failed to create chat room',
        error: error,
      };
    }
  }

  @MessagePattern(MESSAGE_PATTERNS.CHAT.JOIN_ROOM)
  async joinRoom(@Payload() data: IJoinRoomRequest): Promise<IServiceResponse> {
    try {
      this.logger.log(`User ${data.userId} joining room ${data.roomId}`);
      await this.chatService.joinRoom(data);
      
      return {
        success: true,
        message: 'Successfully joined chat room',
      };
    } catch (error) {
      this.logger.error(`Failed to join room: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Failed to join chat room',
        error: error,
      };
    }
  }

  @MessagePattern(MESSAGE_PATTERNS.CHAT.LEAVE_ROOM)
  async leaveRoom(@Payload() data: ILeaveRoomRequest): Promise<IServiceResponse> {
    try {
      this.logger.log(`User ${data.userId} leaving room ${data.roomId}`);
      await this.chatService.leaveRoom(data);
      
      return {
        success: true,
        message: 'Successfully left chat room',
      };
    } catch (error) {
      this.logger.error(`Failed to leave room: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Failed to leave chat room',
        error: error,
      };
    }
  }

  @MessagePattern(MESSAGE_PATTERNS.CHAT.SEND_MESSAGE)
  async sendMessage(@Payload() data: ISendMessageRequest): Promise<IServiceResponse<IMessage>> {
    try {
      this.logger.log(`User ${data.userId} sending message to room ${data.chatRoomId}`);
      const message = await this.chatService.sendMessage(data);
      
      return {
        success: true,
        message: 'Message sent successfully',
        data: message,
      };
    } catch (error) {
      this.logger.error(`Failed to send message: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Failed to send message',
        error: error,
      };
    }
  }

  @MessagePattern(MESSAGE_PATTERNS.CHAT.GET_MESSAGES)
  async getMessages(@Payload() data: { chatRoomId: string; pagination: PaginationOptions }): Promise<IPaginatedResponse<IMessage>> {
    try {
      this.logger.log(`Getting messages for room ${data.chatRoomId}`);
      const result = await this.chatService.getMessages(data.chatRoomId, data.pagination);
      
      return {
        success: true,
        message: 'Messages retrieved successfully',
        data: result.data,
        meta: result.meta,
      };
    } catch (error) {
      this.logger.error(`Failed to get messages: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Failed to get messages',
        data: [],
        meta: {
          page: data.pagination.page || 1,
          limit: data.pagination.limit || 10,
          total: 0,
          totalPages: 0,
        },
      };
    }
  }

  @MessagePattern(MESSAGE_PATTERNS.CHAT.GET_ROOMS)
  async getRooms(@Payload() data: { userId: string; pagination: PaginationOptions }): Promise<IPaginatedResponse<IChatRoom>> {
    try {
      this.logger.log(`Getting chat rooms for user ${data.userId}`);
      const result = await this.chatService.getUserRooms(data.userId, data.pagination);
      
      return {
        success: true,
        message: 'Chat rooms retrieved successfully',
        data: result.data,
        meta: result.meta,
      };
    } catch (error) {
      this.logger.error(`Failed to get rooms: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Failed to get chat rooms',
        data: [],
        meta: {
          page: data.pagination.page || 1,
          limit: data.pagination.limit || 10,
          total: 0,
          totalPages: 0,
        },
      };
    }
  }
}