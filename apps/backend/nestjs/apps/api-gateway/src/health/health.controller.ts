import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public, SuccessResponseDto } from '@shared';

@ApiTags('health')
@Controller('health')
export class HealthController {
  
  @Public()
  @Get()
  @ApiOperation({ summary: 'Check API Gateway health status' })
  @ApiResponse({ status: 200, description: 'Service is healthy', type: SuccessResponseDto })
  checkHealth() {
    return {
      success: true,
      message: 'API Gateway is healthy',
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
      },
    };
  }

  @Public()
  @Get('ready')
  @ApiOperation({ summary: 'Check if API Gateway is ready to serve requests' })
  @ApiResponse({ status: 200, description: 'Service is ready', type: SuccessResponseDto })
  checkReadiness() {
    return {
      success: true,
      message: 'API Gateway is ready',
      data: {
        status: 'ready',
        timestamp: new Date().toISOString(),
      },
    };
  }

  @Public()
  @Get('live')
  @ApiOperation({ summary: 'Check if API Gateway is alive' })
  @ApiResponse({ status: 200, description: 'Service is alive', type: SuccessResponseDto })
  checkLiveness() {
    return {
      success: true,
      message: 'API Gateway is alive',
      data: {
        status: 'alive',
        timestamp: new Date().toISOString(),
      },
    };
  }
}