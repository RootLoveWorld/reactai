import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import {
  MESSAGE_PATTERNS,
  IServiceResponse,
  IPaginatedResponse,
  IUser,
  IUpdateUserRequest,
  PaginationOptions,
} from '@shared';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @MessagePattern(MESSAGE_PATTERNS.USER.FIND_BY_ID)
  async findById(@Payload() data: { id: string }): Promise<IServiceResponse<IUser>> {
    try {
      this.logger.log(`Finding user by ID: ${data.id}`);
      const user = await this.userService.findById(data.id);
      
      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }

      return {
        success: true,
        message: 'User found successfully',
        data: user,
      };
    } catch (error) {
      this.logger.error(`Failed to find user by ID ${data.id}: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Failed to find user',
        error: error,
      };
    }
  }

  @MessagePattern(MESSAGE_PATTERNS.USER.FIND_BY_EMAIL)
  async findByEmail(@Payload() data: { email: string }): Promise<IServiceResponse<IUser>> {
    try {
      this.logger.log(`Finding user by email: ${data.email}`);
      const user = await this.userService.findByEmail(data.email);
      
      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }

      return {
        success: true,
        message: 'User found successfully',
        data: user,
      };
    } catch (error) {
      this.logger.error(`Failed to find user by email ${data.email}: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Failed to find user',
        error: error,
      };
    }
  }

  @MessagePattern(MESSAGE_PATTERNS.USER.UPDATE)
  async update(@Payload() data: { id: string; userData: IUpdateUserRequest }): Promise<IServiceResponse<IUser>> {
    try {
      this.logger.log(`Updating user: ${data.id}`);
      const user = await this.userService.update(data.id, data.userData);
      
      return {
        success: true,
        message: 'User updated successfully',
        data: user,
      };
    } catch (error) {
      this.logger.error(`Failed to update user ${data.id}: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Failed to update user',
        error: error,
      };
    }
  }

  @MessagePattern(MESSAGE_PATTERNS.USER.DELETE)
  async delete(@Payload() data: { id: string }): Promise<IServiceResponse> {
    try {
      this.logger.log(`Deleting user: ${data.id}`);
      await this.userService.delete(data.id);
      
      return {
        success: true,
        message: 'User deleted successfully',
      };
    } catch (error) {
      this.logger.error(`Failed to delete user ${data.id}: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Failed to delete user',
        error: error,
      };
    }
  }

  @MessagePattern(MESSAGE_PATTERNS.USER.FIND_ALL)
  async findAll(@Payload() data: PaginationOptions): Promise<IPaginatedResponse<IUser>> {
    try {
      this.logger.log(`Finding all users with pagination: page ${data.page}, limit ${data.limit}`);
      const result = await this.userService.findAll(data);
      
      return {
        success: true,
        message: 'Users retrieved successfully',
        data: result.data,
        meta: result.meta,
      };
    } catch (error) {
      this.logger.error(`Failed to find all users: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Failed to retrieve users',
        data: [],
        meta: {
          page: data.page,
          limit: data.limit,
          total: 0,
          totalPages: 0,
        },
      };
    }
  }
}