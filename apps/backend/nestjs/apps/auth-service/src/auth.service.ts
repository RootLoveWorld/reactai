import { Injectable, UnauthorizedException, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import {
  User,
  IAuthRequest,
  IAuthResponse,
  ITokenValidationRequest,
  ITokenValidationResponse,
  IJwtPayload,
  ICreateUserRequest,
} from '@shared';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(userData: ICreateUserRequest): Promise<IAuthResponse> {
    // Check if user already exists
    const existingUserByEmail = await this.userRepository.findOne({
      where: { email: userData.email }
    });

    if (existingUserByEmail) {
      throw new ConflictException('User with this email already exists');
    }

    const existingUserByUsername = await this.userRepository.findOne({
      where: { username: userData.username }
    });

    if (existingUserByUsername) {
      throw new ConflictException('User with this username already exists');
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(userData.password, saltRounds);

    // Create user
    const user = this.userRepository.create({
      email: userData.email,
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      passwordHash,
    });

    const savedUser = await this.userRepository.save(user);

    // Generate tokens
    const tokens = await this.generateTokens(savedUser);

    // Update last login
    savedUser.lastLogin = new Date();
    await this.userRepository.save(savedUser);

    return {
      user: savedUser,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async login(authRequest: IAuthRequest): Promise<IAuthResponse | null> {
    const user = await this.validateUser(authRequest.email, authRequest.password);
    
    if (!user) {
      return null;
    }

    const tokens = await this.generateTokens(user);

    // Update last login
    user.lastLogin = new Date();
    await this.userRepository.save(user);

    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { email, isActive: true }
      });

      if (!user) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      
      if (!isPasswordValid) {
        return null;
      }

      return user;
    } catch (error) {
      this.logger.error(`User validation error: ${error.message}`);
      return null;
    }
  }

  async validateToken(token: string): Promise<ITokenValidationResponse> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Verify user still exists and is active
      const user = await this.userRepository.findOne({
        where: { id: payload.sub, isActive: true }
      });

      if (!user) {
        return { valid: false };
      }

      return {
        valid: true,
        payload: {
          sub: payload.sub,
          email: payload.email,
          username: payload.username,
          iat: payload.iat,
          exp: payload.exp,
        },
      };
    } catch (error) {
      this.logger.error(`Token validation error: ${error.message}`);
      return { valid: false };
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.sub, isActive: true }
      });

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string, token: string): Promise<void> {
    // In a production environment, you might want to maintain a blacklist of tokens
    // For now, we'll just log the logout attempt
    this.logger.log(`User ${userId} logged out`);
    
    // You could implement token blacklisting using Redis here:
    // await this.redisService.set(`blacklist_${token}`, 'true', 'EX', tokenExpiry);
  }

  private async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: IJwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '7d'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '30d'),
    });

    return { accessToken, refreshToken };
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: userId, isActive: true }
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email, isActive: true }
    });
  }
}