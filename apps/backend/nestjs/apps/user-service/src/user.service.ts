import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, IUpdateUserRequest, PaginationOptions, IPaginationMeta } from '@shared';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id, isActive: true },
      });
      
      return user;
    } catch (error) {
      this.logger.error(`Error finding user by ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { email, isActive: true },
      });
      
      return user;
    } catch (error) {
      this.logger.error(`Error finding user by email ${email}: ${error.message}`);
      throw error;
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { username, isActive: true },
      });
      
      return user;
    } catch (error) {
      this.logger.error(`Error finding user by username ${username}: ${error.message}`);
      throw error;
    }
  }

  async update(id: string, userData: IUpdateUserRequest): Promise<User> {
    try {
      const user = await this.findById(id);
      
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Check for email uniqueness if email is being updated
      if (userData.email && userData.email !== user.email) {
        const existingUser = await this.userRepository.findOne({
          where: { email: userData.email, isActive: true },
        });
        
        if (existingUser && existingUser.id !== id) {
          throw new ConflictException('Email already exists');
        }
      }

      // Check for username uniqueness if username is being updated
      if (userData.username && userData.username !== user.username) {
        const existingUser = await this.userRepository.findOne({
          where: { username: userData.username, isActive: true },
        });
        
        if (existingUser && existingUser.id !== id) {
          throw new ConflictException('Username already exists');
        }
      }

      // Update user fields
      Object.assign(user, userData);
      user.updatedAt = new Date();

      const updatedUser = await this.userRepository.save(user);
      return updatedUser;
    } catch (error) {
      this.logger.error(`Error updating user ${id}: ${error.message}`);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const user = await this.findById(id);
      
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Soft delete - mark as inactive instead of removing from database
      user.isActive = false;
      user.updatedAt = new Date();
      
      await this.userRepository.save(user);
      this.logger.log(`User ${id} marked as inactive (soft deleted)`);
    } catch (error) {
      this.logger.error(`Error deleting user ${id}: ${error.message}`);
      throw error;
    }
  }

  async findAll(options: PaginationOptions): Promise<{ data: User[]; meta: IPaginationMeta }> {
    try {
      const { page = 1, limit = 10, orderBy = 'createdAt', orderDirection = 'DESC' } = options;
      
      const [users, total] = await this.userRepository.findAndCount({
        where: { isActive: true },
        order: { [orderBy]: orderDirection },
        skip: (page - 1) * limit,
        take: limit,
      });

      const totalPages = Math.ceil(total / limit);

      return {
        data: users,
        meta: {
          page,
          limit,
          total,
          totalPages,
        },
      };
    } catch (error) {
      this.logger.error(`Error finding all users: ${error.message}`);
      throw error;
    }
  }

  async getUserStats(id: string): Promise<any> {
    try {
      const user = await this.findById(id);
      
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Here you could add more complex stats logic
      // For example, counting messages, chat rooms joined, etc.
      
      return {
        userId: user.id,
        username: user.username,
        joinedAt: user.createdAt,
        lastActive: user.lastLogin,
        isActive: user.isActive,
        // Add more stats as needed
        // messageCount: await this.getMessageCount(id),
        // chatRoomCount: await this.getChatRoomCount(id),
      };
    } catch (error) {
      this.logger.error(`Error getting user stats for ${id}: ${error.message}`);
      throw error;
    }
  }

  async searchUsers(query: string, options: PaginationOptions): Promise<{ data: User[]; meta: IPaginationMeta }> {
    try {
      const { page = 1, limit = 10 } = options;
      
      const [users, total] = await this.userRepository
        .createQueryBuilder('user')
        .where('user.isActive = :isActive', { isActive: true })
        .andWhere(
          '(LOWER(user.username) LIKE LOWER(:query) OR LOWER(user.firstName) LIKE LOWER(:query) OR LOWER(user.lastName) LIKE LOWER(:query) OR LOWER(user.email) LIKE LOWER(:query))',
          { query: `%${query}%` }
        )
        .orderBy('user.createdAt', 'DESC')
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      const totalPages = Math.ceil(total / limit);

      return {
        data: users,
        meta: {
          page,
          limit,
          total,
          totalPages,
        },
      };
    } catch (error) {
      this.logger.error(`Error searching users with query "${query}": ${error.message}`);
      throw error;
    }
  }
}