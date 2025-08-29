import { 
  Controller, 
  Post, 
  Body, 
  HttpStatus, 
  HttpException, 
  Inject, 
  Logger,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { 
  SERVICE_NAMES, 
  MESSAGE_PATTERNS, 
  LoginDto, 
  RegisterDto, 
  RefreshTokenDto,
  SuccessResponseDto,
  ErrorResponseDto,
  IServiceResponse,
  IAuthResponse,
  Public,
  GetUser,
  IJwtPayload,
  JwtAuthGuard,
} from '@shared';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    @Inject(SERVICE_NAMES.AUTH_SERVICE) 
    private readonly authClient: ClientProxy,
  ) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully', type: SuccessResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request', type: ErrorResponseDto })
  @ApiResponse({ status: 409, description: 'User already exists', type: ErrorResponseDto })
  async register(@Body() registerDto: RegisterDto) {
    try {
      const result: IServiceResponse<IAuthResponse> = await firstValueFrom(
        this.authClient.send(MESSAGE_PATTERNS.AUTH.REGISTER, registerDto),
      );

      if (!result.success) {
        throw new HttpException(
          {
            success: false,
            message: result.message,
            error: result.error,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        success: true,
        message: 'User registered successfully',
        data: result.data,
      };
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Registration failed',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful', type: SuccessResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials', type: ErrorResponseDto })
  async login(@Body() loginDto: LoginDto) {
    try {
      const result: IServiceResponse<IAuthResponse> = await firstValueFrom(
        this.authClient.send(MESSAGE_PATTERNS.AUTH.LOGIN, loginDto),
      );

      if (!result.success) {
        throw new HttpException(
          {
            success: false,
            message: result.message || 'Invalid credentials',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      return {
        success: true,
        message: 'Login successful',
        data: result.data,
      };
    } catch (error) {
      this.logger.error(`Login failed: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Login failed',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully', type: SuccessResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid refresh token', type: ErrorResponseDto })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      const result: IServiceResponse<{ accessToken: string; refreshToken: string }> = await firstValueFrom(
        this.authClient.send(MESSAGE_PATTERNS.AUTH.REFRESH_TOKEN, refreshTokenDto),
      );

      if (!result.success) {
        throw new HttpException(
          {
            success: false,
            message: result.message || 'Invalid refresh token',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      return {
        success: true,
        message: 'Token refreshed successfully',
        data: result.data,
      };
    } catch (error) {
      this.logger.error(`Token refresh failed: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          message: 'Token refresh failed',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'Logout successful', type: SuccessResponseDto })
  async logout(@GetUser() user: IJwtPayload, @Req() req) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      const result: IServiceResponse = await firstValueFrom(
        this.authClient.send(MESSAGE_PATTERNS.AUTH.LOGOUT, {
          userId: user.sub,
          token,
        }),
      );

      return {
        success: true,
        message: 'Logout successful',
      };
    } catch (error) {
      this.logger.error(`Logout failed: ${error.message}`);
      throw new HttpException(
        {
          success: false,
          message: 'Logout failed',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully', type: SuccessResponseDto })
  async getProfile(@GetUser() user: IJwtPayload) {
    return {
      success: true,
      message: 'Profile retrieved successfully',
      data: user,
    };
  }

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Check auth service health' })
  async healthCheck() {
    return {
      success: true,
      message: 'Auth service is healthy',
      timestamp: new Date().toISOString(),
    };
  }
}