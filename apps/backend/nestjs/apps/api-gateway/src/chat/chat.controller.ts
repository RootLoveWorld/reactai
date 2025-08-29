import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import {
  SERVICE_NAMES,
  MESSAGE_PATTERNS,
  CreateRoomDto,
  SendMessageDto,
  JoinRoomDto,
  PaginationDto,
  SuccessResponseDto,
  ErrorResponseDto,
  IServiceResponse,
  IPaginatedResponse,
  IChatRoom,
  IMessage,
  GetUser,
  GetUserId,
  IJwtPayload,
  JwtAuthGuard,
} from '@shared';

@ApiTags('chat')
@Controller('chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChatController {
  private readonly logger = new Logger(ChatController.name);

  constructor(
    @Inject(SERVICE_NAMES.CHAT_SERVICE)
    private readonly chatClient: ClientProxy,
  ) {}

  @Post('rooms')
  @ApiOperation({ summary: 'Create a new chat room' })
  @ApiResponse({ status: 201, description: 'Room created successfully', type: SuccessResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorResponseDto })
  async createRoom(
    @Body() createRoomDto: CreateRoomDto,
    @GetUserId() userId: string,
  ) {
    try {
      const result: IServiceResponse<IChatRoom> = await firstValueFrom(
        this.chatClient.send(MESSAGE_PATTERNS.CHAT.CREATE_ROOM, {
          ...createRoomDto,
          createdBy: userId,
        }),
      );

      if (!result.success) {
        throw new HttpException(
          {
            success: false,
            message: result.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        success: true,
        message: 'Chat room created successfully',
        data: result.data,
      };
    } catch (error) {
      this.logger.error(`Failed to create room: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to create room',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('rooms')
  @ApiOperation({ summary: 'Get user chat rooms' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'Rooms retrieved successfully', type: SuccessResponseDto })
  async getUserRooms(
    @Query() pagination: PaginationDto,
    @GetUserId() userId: string,
  ) {
    try {
      const result: IPaginatedResponse<IChatRoom> = await firstValueFrom(
        this.chatClient.send(MESSAGE_PATTERNS.CHAT.GET_ROOMS, {
          userId,
          pagination,
        }),
      );

      return {
        success: true,
        message: 'Chat rooms retrieved successfully',
        data: result.data,
        meta: result.meta,
      };
    } catch (error) {
      this.logger.error(`Failed to get user rooms: ${error.message}`);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to retrieve rooms',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('rooms/:roomId/join')
  @ApiOperation({ summary: 'Join a chat room' })
  @ApiParam({ name: 'roomId', description: 'Room ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Successfully joined room', type: SuccessResponseDto })
  @ApiResponse({ status: 404, description: 'Room not found', type: ErrorResponseDto })
  @ApiResponse({ status: 409, description: 'Already a member', type: ErrorResponseDto })
  async joinRoom(
    @Param('roomId', ParseUUIDPipe) roomId: string,
    @GetUserId() userId: string,
  ) {
    try {
      const result: IServiceResponse = await firstValueFrom(
        this.chatClient.send(MESSAGE_PATTERNS.CHAT.JOIN_ROOM, {
          roomId,
          userId,
        }),
      );

      if (!result.success) {
        const status = result.message.includes('not found')
          ? HttpStatus.NOT_FOUND
          : result.message.includes('already')
          ? HttpStatus.CONFLICT
          : HttpStatus.BAD_REQUEST;

        throw new HttpException(
          {
            success: false,
            message: result.message,
          },
          status,
        );
      }

      return {
        success: true,
        message: 'Successfully joined chat room',
      };
    } catch (error) {
      this.logger.error(`Failed to join room ${roomId}: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to join room',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('rooms/:roomId/leave')
  @ApiOperation({ summary: 'Leave a chat room' })
  @ApiParam({ name: 'roomId', description: 'Room ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Successfully left room', type: SuccessResponseDto })
  @ApiResponse({ status: 404, description: 'Not a member of room', type: ErrorResponseDto })
  async leaveRoom(
    @Param('roomId', ParseUUIDPipe) roomId: string,
    @GetUserId() userId: string,
  ) {
    try {
      const result: IServiceResponse = await firstValueFrom(
        this.chatClient.send(MESSAGE_PATTERNS.CHAT.LEAVE_ROOM, {
          roomId,
          userId,
        }),
      );

      if (!result.success) {
        throw new HttpException(
          {
            success: false,
            message: result.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        success: true,
        message: 'Successfully left chat room',
      };
    } catch (error) {
      this.logger.error(`Failed to leave room ${roomId}: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to leave room',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('messages')
  @ApiOperation({ summary: 'Send a message (use WebSocket for real-time)' })
  @ApiResponse({ status: 201, description: 'Message sent successfully', type: SuccessResponseDto })
  @ApiResponse({ status: 403, description: 'Not a member of room or muted', type: ErrorResponseDto })
  async sendMessage(
    @Body() sendMessageDto: SendMessageDto,
    @GetUserId() userId: string,
  ) {
    try {
      const result: IServiceResponse<IMessage> = await firstValueFrom(
        this.chatClient.send(MESSAGE_PATTERNS.CHAT.SEND_MESSAGE, {
          ...sendMessageDto,
          userId,
        }),
      );

      if (!result.success) {
        const status = result.message.includes('not a member') || result.message.includes('muted')
          ? HttpStatus.FORBIDDEN
          : HttpStatus.BAD_REQUEST;

        throw new HttpException(
          {
            success: false,
            message: result.message,
          },
          status,
        );
      }

      return {
        success: true,
        message: 'Message sent successfully',
        data: result.data,
      };
    } catch (error) {
      this.logger.error(`Failed to send message: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to send message',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('rooms/:roomId/messages')
  @ApiOperation({ summary: 'Get chat room messages' })
  @ApiParam({ name: 'roomId', description: 'Room ID', type: 'string' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully', type: SuccessResponseDto })
  async getRoomMessages(
    @Param('roomId', ParseUUIDPipe) roomId: string,
    @Query() pagination: PaginationDto,
  ) {
    try {
      const result: IPaginatedResponse<IMessage> = await firstValueFrom(
        this.chatClient.send(MESSAGE_PATTERNS.CHAT.GET_MESSAGES, {
          chatRoomId: roomId,
          pagination,
        }),
      );

      return {
        success: true,
        message: 'Messages retrieved successfully',
        data: result.data,
        meta: result.meta,
      };
    } catch (error) {
      this.logger.error(`Failed to get messages for room ${roomId}: ${error.message}`);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to retrieve messages',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}