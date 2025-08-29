import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';

import { ChatService } from '../src/chat.service';
import { 
  ChatRoom, 
  Message, 
  User, 
  UserChatRoom, 
  UserRole, 
  MessageType,
  SERVICE_NAMES 
} from '@shared';

describe('ChatService', () => {
  let service: ChatService;
  let chatRoomRepository: Repository<ChatRoom>;
  let messageRepository: Repository<Message>;
  let userRepository: Repository<User>;
  let userChatRoomRepository: Repository<UserChatRoom>;
  let userClient: any;

  const mockUser = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    isActive: true,
  } as User;

  const mockChatRoom = {
    id: '456e7890-e12b-34c5-a678-901234567890',
    name: 'Test Room',
    description: 'A test chat room',
    isPrivate: false,
    maxMembers: 100,
    isActive: true,
    createdById: mockUser.id,
  } as ChatRoom;

  const mockMessage = {
    id: '789e0123-e45f-67g8-a901-234567890123',
    content: 'Test message',
    type: MessageType.TEXT,
    chatRoomId: mockChatRoom.id,
    userId: mockUser.id,
    isDeleted: false,
    createdAt: new Date(),
  } as Message;

  const mockUserChatRoom = {
    id: 'abc1234-def5-6789-ghij-klmnopqrstuv',
    userId: mockUser.id,
    chatRoomId: mockChatRoom.id,
    role: UserRole.MEMBER,
    isActive: true,
    isMuted: false,
  } as UserChatRoom;

  const mockChatRoomRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const mockMessageRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findAndCount: jest.fn(),
  };

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  const mockUserChatRoomRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findAndCount: jest.fn(),
    count: jest.fn(),
  };

  const mockUserClient = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: getRepositoryToken(ChatRoom),
          useValue: mockChatRoomRepository,
        },
        {
          provide: getRepositoryToken(Message),
          useValue: mockMessageRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(UserChatRoom),
          useValue: mockUserChatRoomRepository,
        },
        {
          provide: SERVICE_NAMES.USER_SERVICE,
          useValue: mockUserClient,
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
    chatRoomRepository = module.get<Repository<ChatRoom>>(getRepositoryToken(ChatRoom));
    messageRepository = module.get<Repository<Message>>(getRepositoryToken(Message));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    userChatRoomRepository = module.get<Repository<UserChatRoom>>(getRepositoryToken(UserChatRoom));
    userClient = module.get(SERVICE_NAMES.USER_SERVICE);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRoom', () => {
    const createRoomData = {
      name: 'New Room',
      description: 'A new chat room',
      isPrivate: false,
      createdBy: mockUser.id,
    };

    it('should successfully create a new room', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockChatRoomRepository.create.mockReturnValue(mockChatRoom);
      mockChatRoomRepository.save.mockResolvedValue(mockChatRoom);
      mockUserChatRoomRepository.create.mockReturnValue(mockUserChatRoom);
      mockUserChatRoomRepository.save.mockResolvedValue(mockUserChatRoom);

      const result = await service.createRoom(createRoomData);

      expect(result).toBe(mockChatRoom);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockUser.id, isActive: true },
      });
      expect(mockChatRoomRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: createRoomData.name,
          description: createRoomData.description,
        }),
      );
      expect(mockUserChatRoomRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: mockUser.id,
          chatRoomId: mockChatRoom.id,
          role: UserRole.OWNER,
        }),
      );
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.createRoom(createRoomData)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('joinRoom', () => {
    const joinRoomData = {
      roomId: mockChatRoom.id,
      userId: mockUser.id,
    };

    it('should successfully join a room', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockChatRoomRepository.findOne.mockResolvedValue(mockChatRoom);
      mockUserChatRoomRepository.findOne.mockResolvedValue(null); // Not already a member
      mockUserChatRoomRepository.count.mockResolvedValue(50); // Room not at capacity
      mockUserChatRoomRepository.create.mockReturnValue(mockUserChatRoom);
      mockUserChatRoomRepository.save.mockResolvedValue(mockUserChatRoom);

      // Mock system message creation
      mockMessageRepository.create.mockReturnValue(mockMessage);
      mockMessageRepository.save.mockResolvedValue(mockMessage);

      await service.joinRoom(joinRoomData);

      expect(mockUserChatRoomRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: joinRoomData.userId,
          chatRoomId: joinRoomData.roomId,
          role: UserRole.MEMBER,
        }),
      );
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.joinRoom(joinRoomData)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if room does not exist', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockChatRoomRepository.findOne.mockResolvedValue(null);

      await expect(service.joinRoom(joinRoomData)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ConflictException if user is already a member', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockChatRoomRepository.findOne.mockResolvedValue(mockChatRoom);
      mockUserChatRoomRepository.findOne.mockResolvedValue(mockUserChatRoom);

      await expect(service.joinRoom(joinRoomData)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ForbiddenException if room is at capacity', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockChatRoomRepository.findOne.mockResolvedValue(mockChatRoom);
      mockUserChatRoomRepository.findOne.mockResolvedValue(null);
      mockUserChatRoomRepository.count.mockResolvedValue(100); // At max capacity

      await expect(service.joinRoom(joinRoomData)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('sendMessage', () => {
    const sendMessageData = {
      content: 'Hello, world!',
      chatRoomId: mockChatRoom.id,
      userId: mockUser.id,
    };

    it('should successfully send a message', async () => {
      const activeMembership = {
        ...mockUserChatRoom,
        isMuted: false,
        mutedUntil: null,
      };

      mockUserChatRoomRepository.findOne.mockResolvedValue(activeMembership);
      mockMessageRepository.create.mockReturnValue(mockMessage);
      mockMessageRepository.save.mockResolvedValue(mockMessage);
      mockMessageRepository.findOne.mockResolvedValue({
        ...mockMessage,
        user: mockUser,
      });

      const result = await service.sendMessage(sendMessageData);

      expect(result).toBeDefined();
      expect(result.user).toBe(mockUser);
      expect(mockMessageRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          content: sendMessageData.content,
          chatRoomId: sendMessageData.chatRoomId,
          userId: sendMessageData.userId,
          type: MessageType.TEXT,
        }),
      );
    });

    it('should throw ForbiddenException if user is not a member', async () => {
      mockUserChatRoomRepository.findOne.mockResolvedValue(null);

      await expect(service.sendMessage(sendMessageData)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ForbiddenException if user is muted', async () => {
      const mutedMembership = {
        ...mockUserChatRoom,
        isMuted: true,
        mutedUntil: new Date(Date.now() + 3600000), // Muted for 1 hour
      };

      mockUserChatRoomRepository.findOne.mockResolvedValue(mutedMembership);

      await expect(service.sendMessage(sendMessageData)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('getMessages', () => {
    const paginationOptions = {
      page: 1,
      limit: 20,
      orderBy: 'createdAt',
      orderDirection: 'DESC' as const,
    };

    it('should successfully get messages with pagination', async () => {
      const messages = [mockMessage];
      const total = 1;

      mockMessageRepository.findAndCount.mockResolvedValue([messages, total]);

      const result = await service.getMessages(mockChatRoom.id, paginationOptions);

      expect(result.data).toBe(messages);
      expect(result.meta).toEqual({
        page: 1,
        limit: 20,
        total: 1,
        totalPages: 1,
      });
    });
  });

  describe('getUserRooms', () => {
    const paginationOptions = {
      page: 1,
      limit: 10,
    };

    it('should successfully get user rooms', async () => {
      const memberships = [{ ...mockUserChatRoom, chatRoom: mockChatRoom }];
      const total = 1;

      mockUserChatRoomRepository.findAndCount.mockResolvedValue([memberships, total]);

      const result = await service.getUserRooms(mockUser.id, paginationOptions);

      expect(result.data).toEqual([mockChatRoom]);
      expect(result.meta).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      });
    });
  });

  describe('isUserInRoom', () => {
    it('should return true if user is in room', async () => {
      mockUserChatRoomRepository.findOne.mockResolvedValue(mockUserChatRoom);

      const result = await service.isUserInRoom(mockUser.id, mockChatRoom.id);

      expect(result).toBe(true);
    });

    it('should return false if user is not in room', async () => {
      mockUserChatRoomRepository.findOne.mockResolvedValue(null);

      const result = await service.isUserInRoom(mockUser.id, mockChatRoom.id);

      expect(result).toBe(false);
    });
  });

  describe('getUserRole', () => {
    it('should return user role if user is in room', async () => {
      mockUserChatRoomRepository.findOne.mockResolvedValue(mockUserChatRoom);

      const result = await service.getUserRole(mockUser.id, mockChatRoom.id);

      expect(result).toBe(UserRole.MEMBER);
    });

    it('should return null if user is not in room', async () => {
      mockUserChatRoomRepository.findOne.mockResolvedValue(null);

      const result = await service.getUserRole(mockUser.id, mockChatRoom.id);

      expect(result).toBeNull();
    });
  });
});
