import { Injectable, NotFoundException, ForbiddenException, ConflictException, Logger, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { 
  ChatRoom, 
  Message, 
  User, 
  UserChatRoom, 
  UserRole,
  MessageType,
  ICreateRoomRequest,
  ISendMessageRequest,
  IJoinRoomRequest,
  ILeaveRoomRequest,
  PaginationOptions,
  IPaginationMeta,
  SERVICE_NAMES,
  MESSAGE_PATTERNS
} from '@shared';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserChatRoom)
    private userChatRoomRepository: Repository<UserChatRoom>,
    @Inject(SERVICE_NAMES.USER_SERVICE)
    private readonly userClient: ClientProxy,
  ) {}

  async createRoom(data: ICreateRoomRequest): Promise<ChatRoom> {
    try {
      // Verify user exists
      const user = await this.userRepository.findOne({
        where: { id: data.createdBy, isActive: true },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Create chat room
      const chatRoom = this.chatRoomRepository.create({
        name: data.name,
        description: data.description,
        isPrivate: data.isPrivate || false,
        createdById: data.createdBy,
      });

      const savedRoom = await this.chatRoomRepository.save(chatRoom);

      // Add creator as owner
      const userChatRoom = this.userChatRoomRepository.create({
        userId: data.createdBy,
        chatRoomId: savedRoom.id,
        role: UserRole.OWNER,
      });

      await this.userChatRoomRepository.save(userChatRoom);

      return savedRoom;
    } catch (error) {
      this.logger.error(`Error creating room: ${error.message}`);
      throw error;
    }
  }

  async joinRoom(data: IJoinRoomRequest): Promise<void> {
    try {
      // Verify user exists
      const user = await this.userRepository.findOne({
        where: { id: data.userId, isActive: true },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Verify room exists
      const room = await this.chatRoomRepository.findOne({
        where: { id: data.roomId, isActive: true },
      });

      if (!room) {
        throw new NotFoundException('Chat room not found');
      }

      // Check if user is already in the room
      const existingMembership = await this.userChatRoomRepository.findOne({
        where: { userId: data.userId, chatRoomId: data.roomId, isActive: true },
      });

      if (existingMembership) {
        throw new ConflictException('User is already a member of this room');
      }

      // Check room capacity
      const memberCount = await this.userChatRoomRepository.count({
        where: { chatRoomId: data.roomId, isActive: true },
      });

      if (memberCount >= room.maxMembers) {
        throw new ForbiddenException('Room is at maximum capacity');
      }

      // Add user to room
      const userChatRoom = this.userChatRoomRepository.create({
        userId: data.userId,
        chatRoomId: data.roomId,
        role: UserRole.MEMBER,
      });

      await this.userChatRoomRepository.save(userChatRoom);

      // Send system message
      await this.sendSystemMessage(
        data.roomId,
        `${user.username} joined the chat`,
      );
    } catch (error) {
      this.logger.error(`Error joining room: ${error.message}`);
      throw error;
    }
  }

  async leaveRoom(data: ILeaveRoomRequest): Promise<void> {
    try {
      const membership = await this.userChatRoomRepository.findOne({
        where: { userId: data.userId, chatRoomId: data.roomId, isActive: true },
        relations: ['user'],
      });

      if (!membership) {
        throw new NotFoundException('User is not a member of this room');
      }

      // Mark membership as inactive
      membership.leave();
      await this.userChatRoomRepository.save(membership);

      // Send system message
      await this.sendSystemMessage(
        data.roomId,
        `${membership.user.username} left the chat`,
      );
    } catch (error) {
      this.logger.error(`Error leaving room: ${error.message}`);
      throw error;
    }
  }

  async sendMessage(data: ISendMessageRequest): Promise<Message> {
    try {
      // Verify user is member of the room and not muted
      const membership = await this.userChatRoomRepository.findOne({
        where: { userId: data.userId, chatRoomId: data.chatRoomId, isActive: true },
      });

      if (!membership) {
        throw new ForbiddenException('User is not a member of this room');
      }

      if (membership.isMuted && membership.mutedUntil && membership.mutedUntil > new Date()) {
        throw new ForbiddenException('User is muted in this room');
      }

      // Create message
      const message = this.messageRepository.create({
        content: data.content,
        chatRoomId: data.chatRoomId,
        userId: data.userId,
        type: MessageType.TEXT,
      });

      const savedMessage = await this.messageRepository.save(message);

      // Load user information for the response
      const messageWithUser = await this.messageRepository.findOne({
        where: { id: savedMessage.id },
        relations: ['user'],
      });

      return messageWithUser;
    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`);
      throw error;
    }
  }

  async getMessages(chatRoomId: string, options: PaginationOptions): Promise<{ data: Message[]; meta: IPaginationMeta }> {
    try {
      const { page = 1, limit = 20, orderBy = 'createdAt', orderDirection = 'DESC' } = options;

      const [messages, total] = await this.messageRepository.findAndCount({
        where: { chatRoomId, isDeleted: false },
        relations: ['user'],
        order: { [orderBy]: orderDirection },
        skip: (page - 1) * limit,
        take: limit,
      });

      const totalPages = Math.ceil(total / limit);

      return {
        data: messages,
        meta: {
          page,
          limit,
          total,
          totalPages,
        },
      };
    } catch (error) {
      this.logger.error(`Error getting messages: ${error.message}`);
      throw error;
    }
  }

  async getUserRooms(userId: string, options: PaginationOptions): Promise<{ data: ChatRoom[]; meta: IPaginationMeta }> {
    try {
      const { page = 1, limit = 10 } = options;

      const [memberships, total] = await this.userChatRoomRepository.findAndCount({
        where: { userId, isActive: true },
        relations: ['chatRoom'],
        order: { updatedAt: 'DESC' },
        skip: (page - 1) * limit,
        take: limit,
      });

      const rooms = memberships.map(membership => membership.chatRoom);
      const totalPages = Math.ceil(total / limit);

      return {
        data: rooms,
        meta: {
          page,
          limit,
          total,
          totalPages,
        },
      };
    } catch (error) {
      this.logger.error(`Error getting user rooms: ${error.message}`);
      throw error;
    }
  }

  async getRoomById(roomId: string): Promise<ChatRoom> {
    const room = await this.chatRoomRepository.findOne({
      where: { id: roomId, isActive: true },
      relations: ['createdBy', 'members', 'members.user'],
    });

    if (!room) {
      throw new NotFoundException('Chat room not found');
    }

    return room;
  }

  async isUserInRoom(userId: string, roomId: string): Promise<boolean> {
    const membership = await this.userChatRoomRepository.findOne({
      where: { userId, chatRoomId: roomId, isActive: true },
    });

    return !!membership;
  }

  async getUserRole(userId: string, roomId: string): Promise<UserRole | null> {
    const membership = await this.userChatRoomRepository.findOne({
      where: { userId, chatRoomId: roomId, isActive: true },
    });

    return membership ? membership.role : null;
  }

  private async sendSystemMessage(roomId: string, content: string): Promise<void> {
    try {
      const systemMessage = this.messageRepository.create({
        content,
        chatRoomId: roomId,
        userId: null, // System messages don't have a user
        type: MessageType.SYSTEM,
      });

      await this.messageRepository.save(systemMessage);
    } catch (error) {
      this.logger.error(`Error sending system message: ${error.message}`);
      // Don't throw error for system messages to avoid blocking main operations
    }
  }

  async deleteMessage(messageId: string, userId: string): Promise<void> {
    try {
      const message = await this.messageRepository.findOne({
        where: { id: messageId, isDeleted: false },
      });

      if (!message) {
        throw new NotFoundException('Message not found');
      }

      // Check if user is the author or has admin privileges
      if (message.userId !== userId) {
        const userRole = await this.getUserRole(userId, message.chatRoomId);
        if (!userRole || ![UserRole.ADMIN, UserRole.OWNER, UserRole.MODERATOR].includes(userRole)) {
          throw new ForbiddenException('Not authorized to delete this message');
        }
      }

      message.markAsDeleted();
      await this.messageRepository.save(message);
    } catch (error) {
      this.logger.error(`Error deleting message: ${error.message}`);
      throw error;
    }
  }

  async editMessage(messageId: string, userId: string, newContent: string): Promise<Message> {
    try {
      const message = await this.messageRepository.findOne({
        where: { id: messageId, userId, isDeleted: false },
        relations: ['user'],
      });

      if (!message) {
        throw new NotFoundException('Message not found or not owned by user');
      }

      message.content = newContent;
      message.markAsEdited();

      return await this.messageRepository.save(message);
    } catch (error) {
      this.logger.error(`Error editing message: ${error.message}`);
      throw error;
    }
  }
}
