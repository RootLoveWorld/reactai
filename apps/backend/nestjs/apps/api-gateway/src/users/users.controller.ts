import {
  Controller,
  Get,
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
  UpdateUserDto,
  PaginationDto,
  SuccessResponseDto,
  ErrorResponseDto,
  IServiceResponse,
  IPaginatedResponse,
  IUser,
  GetUser,
  GetUserId,
  IJwtPayload,
  JwtAuthGuard,
} from '@shared';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    @Inject(SERVICE_NAMES.USER_SERVICE)
    private readonly userClient: ClientProxy,
  ) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully', type: SuccessResponseDto })
  @ApiResponse({ status: 404, description: 'User not found', type: ErrorResponseDto })
  async getProfile(@GetUserId() userId: string) {
    try {
      const result: IServiceResponse<IUser> = await firstValueFrom(
        this.userClient.send(MESSAGE_PATTERNS.USER.FIND_BY_ID, { id: userId }),
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
        message: 'Profile retrieved successfully',
        data: result.data,
      };
    } catch (error) {
      this.logger.error(`Failed to get profile for user ${userId}: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to retrieve profile',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'User found successfully', type: SuccessResponseDto })
  @ApiResponse({ status: 404, description: 'User not found', type: ErrorResponseDto })
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result: IServiceResponse<IUser> = await firstValueFrom(
        this.userClient.send(MESSAGE_PATTERNS.USER.FIND_BY_ID, { id }),
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
        message: 'User found successfully',
        data: result.data,
      };
    } catch (error) {
      this.logger.error(`Failed to get user by ID ${id}: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to retrieve user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully', type: SuccessResponseDto })
  async getAllUsers(@Query() pagination: PaginationDto) {
    try {
      const result: IPaginatedResponse<IUser> = await firstValueFrom(
        this.userClient.send(MESSAGE_PATTERNS.USER.FIND_ALL, pagination),
      );

      return {
        success: true,
        message: 'Users retrieved successfully',
        data: result.data,
        meta: result.meta,
      };
    } catch (error) {
      this.logger.error(`Failed to get all users: ${error.message}`);
      throw new HttpException(
        {
          success: false,
          message: 'Failed to retrieve users',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully', type: SuccessResponseDto })
  @ApiResponse({ status: 404, description: 'User not found', type: ErrorResponseDto })
  @ApiResponse({ status: 409, description: 'Email or username already exists', type: ErrorResponseDto })
  async updateProfile(
    @GetUserId() userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const result: IServiceResponse<IUser> = await firstValueFrom(
        this.userClient.send(MESSAGE_PATTERNS.USER.UPDATE, {
          id: userId,
          userData: updateUserDto,
        }),
      );

      if (!result.success) {
        const status = result.message.includes('not found') 
          ? HttpStatus.NOT_FOUND 
          : result.message.includes('already exists')
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
        message: 'Profile updated successfully',
        data: result.data,
      };
    } catch (error) {
      this.logger.error(`Failed to update profile for user ${userId}: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to update profile',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID (Admin only)' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: SuccessResponseDto })
  @ApiResponse({ status: 404, description: 'User not found', type: ErrorResponseDto })
  @ApiResponse({ status: 409, description: 'Email or username already exists', type: ErrorResponseDto })
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const result: IServiceResponse<IUser> = await firstValueFrom(
        this.userClient.send(MESSAGE_PATTERNS.USER.UPDATE, {
          id,
          userData: updateUserDto,
        }),
      );

      if (!result.success) {
        const status = result.message.includes('not found')
          ? HttpStatus.NOT_FOUND
          : result.message.includes('already exists')
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
        message: 'User updated successfully',
        data: result.data,
      };
    } catch (error) {
      this.logger.error(`Failed to update user ${id}: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to update user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID (Admin only)' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'User deleted successfully', type: SuccessResponseDto })
  @ApiResponse({ status: 404, description: 'User not found', type: ErrorResponseDto })
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result: IServiceResponse = await firstValueFrom(
        this.userClient.send(MESSAGE_PATTERNS.USER.DELETE, { id }),
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
        message: 'User deleted successfully',
      };
    } catch (error) {
      this.logger.error(`Failed to delete user ${id}: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to delete user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}