import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthService } from '../src/auth.service';
import { User } from '@shared';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;
  let configService: ConfigService;

  const mockUser = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    passwordHash: '$2b$12$hashedpassword',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    const registerData = {
      email: 'newuser@example.com',
      username: 'newuser',
      firstName: 'New',
      lastName: 'User',
      password: 'password123',
    };

    it('should successfully register a new user', async () => {
      // Mock that no existing user is found
      mockUserRepository.findOne.mockResolvedValue(null);
      
      // Mock user creation and save
      mockUserRepository.create.mockReturnValue({ ...registerData, id: mockUser.id });
      mockUserRepository.save.mockResolvedValue(mockUser);

      // Mock JWT token generation
      mockJwtService.sign.mockReturnValue('mock-jwt-token');
      mockConfigService.get.mockReturnValue('mock-secret');

      // Mock bcrypt hash
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword' as never);

      const result = await service.register(registerData);

      expect(result).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.accessToken).toBe('mock-jwt-token');
      expect(result.refreshToken).toBe('mock-jwt-token');
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(2); // Check email and username
      expect(bcrypt.hash).toHaveBeenCalledWith(registerData.password, 12);
    });

    it('should throw ConflictException if email already exists', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(mockUser);

      await expect(service.register(registerData)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException if username already exists', async () => {
      mockUserRepository.findOne
        .mockResolvedValueOnce(null) // Email check
        .mockResolvedValueOnce(mockUser); // Username check

      await expect(service.register(registerData)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('login', () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should successfully login with valid credentials', async () => {
      // Mock finding user and password validation
      jest.spyOn(service, 'validateUser').mockResolvedValue(mockUser);

      // Mock JWT token generation
      mockJwtService.sign.mockReturnValue('mock-jwt-token');
      mockConfigService.get.mockReturnValue('mock-secret');

      const result = await service.login(loginData);

      expect(result).toBeDefined();
      expect(result.user).toBe(mockUser);
      expect(result.accessToken).toBe('mock-jwt-token');
      expect(result.refreshToken).toBe('mock-jwt-token');
    });

    it('should return null for invalid credentials', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      const result = await service.login(loginData);

      expect(result).toBeNull();
    });
  });

  describe('validateUser', () => {
    it('should return user for valid credentials', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.validateUser('test@example.com', 'password123');

      expect(result).toBe(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com', isActive: true },
      });
    });

    it('should return null for invalid password', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      const result = await service.validateUser('test@example.com', 'wrongpassword');

      expect(result).toBeNull();
    });

    it('should return null for non-existent user', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await service.validateUser('nonexistent@example.com', 'password123');

      expect(result).toBeNull();
    });
  });

  describe('validateToken', () => {
    const mockPayload = {
      sub: mockUser.id,
      email: mockUser.email,
      username: mockUser.username,
      iat: 1234567890,
      exp: 1234567890 + 3600,
    };

    it('should return valid payload for valid token', async () => {
      mockJwtService.verify.mockReturnValue(mockPayload);
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockConfigService.get.mockReturnValue('mock-secret');

      const result = await service.validateToken('valid-token');

      expect(result.valid).toBe(true);
      expect(result.payload).toEqual(mockPayload);
    });

    it('should return invalid for expired token', async () => {
      mockJwtService.verify.mockImplementation(() => {
        throw new Error('Token expired');
      });

      const result = await service.validateToken('expired-token');

      expect(result.valid).toBe(false);
      expect(result.payload).toBeUndefined();
    });

    it('should return invalid for non-existent user', async () => {
      mockJwtService.verify.mockReturnValue(mockPayload);
      mockUserRepository.findOne.mockResolvedValue(null);
      mockConfigService.get.mockReturnValue('mock-secret');

      const result = await service.validateToken('valid-token');

      expect(result.valid).toBe(false);
    });
  });

  describe('refreshToken', () => {
    const mockPayload = {
      sub: mockUser.id,
      email: mockUser.email,
      username: mockUser.username,
    };

    it('should successfully refresh token', async () => {
      mockJwtService.verify.mockReturnValue(mockPayload);
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('new-token');
      mockConfigService.get.mockReturnValue('refresh-secret');

      const result = await service.refreshToken('valid-refresh-token');

      expect(result).toBeDefined();
      expect(result.accessToken).toBe('new-token');
      expect(result.refreshToken).toBe('new-token');
    });

    it('should throw UnauthorizedException for invalid refresh token', async () => {
      mockJwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(service.refreshToken('invalid-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});