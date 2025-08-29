import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  MESSAGE_PATTERNS,
  IAuthRequest,
  IAuthResponse,
  ITokenValidationRequest,
  ITokenValidationResponse,
  IServiceResponse,
  ICreateUserRequest,
} from '@shared';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @MessagePattern(MESSAGE_PATTERNS.AUTH.REGISTER)
  async register(@Payload() data: ICreateUserRequest): Promise<IServiceResponse<IAuthResponse>> {
    try {
      this.logger.log(`Register attempt for email: ${data.email}`);
      const result = await this.authService.register(data);
      
      return {
        success: true,
        message: 'User registered successfully',
        data: result,
      };
    } catch (error) {
      this.logger.error(`Registration failed for ${data.email}: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Registration failed',
        error: error,
      };
    }
  }

  @MessagePattern(MESSAGE_PATTERNS.AUTH.LOGIN)
  async login(@Payload() data: IAuthRequest): Promise<IServiceResponse<IAuthResponse>> {
    try {
      this.logger.log(`Login attempt for email: ${data.email}`);
      const result = await this.authService.login(data);
      
      if (!result) {
        return {
          success: false,
          message: 'Invalid credentials',
        };
      }

      return {
        success: true,
        message: 'Login successful',
        data: result,
      };
    } catch (error) {
      this.logger.error(`Login failed for ${data.email}: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Login failed',
        error: error,
      };
    }
  }

  @MessagePattern(MESSAGE_PATTERNS.AUTH.VALIDATE_TOKEN)
  async validateToken(@Payload() data: ITokenValidationRequest): Promise<ITokenValidationResponse> {
    try {
      const result = await this.authService.validateToken(data.token);
      return result;
    } catch (error) {
      this.logger.error(`Token validation failed: ${error.message}`);
      return {
        valid: false,
      };
    }
  }

  @MessagePattern(MESSAGE_PATTERNS.AUTH.REFRESH_TOKEN)
  async refreshToken(@Payload() data: { refreshToken: string }): Promise<IServiceResponse<{ accessToken: string; refreshToken: string }>> {
    try {
      const result = await this.authService.refreshToken(data.refreshToken);
      
      return {
        success: true,
        message: 'Token refreshed successfully',
        data: result,
      };
    } catch (error) {
      this.logger.error(`Token refresh failed: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Token refresh failed',
        error: error,
      };
    }
  }

  @MessagePattern(MESSAGE_PATTERNS.AUTH.LOGOUT)
  async logout(@Payload() data: { userId: string; token: string }): Promise<IServiceResponse> {
    try {
      await this.authService.logout(data.userId, data.token);
      
      return {
        success: true,
        message: 'Logout successful',
      };
    } catch (error) {
      this.logger.error(`Logout failed for user ${data.userId}: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Logout failed',
        error: error,
      };
    }
  }
}