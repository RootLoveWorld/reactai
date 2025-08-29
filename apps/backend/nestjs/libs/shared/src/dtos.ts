import { IsEmail, IsString, MinLength, IsOptional, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Auth DTOs
export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Username',
    example: 'johndoe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'First name',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  refreshToken: string;
}

// User DTOs
export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User email address',
    example: 'newemail@example.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Username',
    example: 'newusername',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'First name',
    example: 'Jane',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Last name',
    example: 'Smith',
  })
  @IsOptional()
  @IsString()
  lastName?: string;
}

// Chat DTOs
export class CreateRoomDto {
  @ApiProperty({
    description: 'Room name',
    example: 'General Discussion',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Room description',
    example: 'A room for general discussions',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Is the room private',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean;
}

export class SendMessageDto {
  @ApiProperty({
    description: 'Message content',
    example: 'Hello, everyone!',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Chat room ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  chatRoomId: string;
}

export class JoinRoomDto {
  @ApiProperty({
    description: 'Room ID to join',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  roomId: string;
}

// Pagination DTOs
export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    default: 1,
  })
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    default: 10,
  })
  @IsOptional()
  limit?: number = 10;
}

// Response DTOs
export class SuccessResponseDto<T = any> {
  @ApiProperty({
    description: 'Operation success status',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Operation completed successfully',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Response data',
  })
  data?: T;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Operation success status',
    example: false,
  })
  success: boolean;

  @ApiProperty({
    description: 'Error message',
    example: 'An error occurred',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Error details',
  })
  error?: any;
}