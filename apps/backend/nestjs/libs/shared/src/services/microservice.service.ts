import { Transport, ClientOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export interface MicroserviceClientConfig {
  name: string;
  transport: Transport;
  options: {
    host: string;
    port: number;
  };
}

export class MicroserviceConfigService {
  static getTcpClientConfig(
    serviceName: string,
    configService: ConfigService,
    defaultPort: number,
  ): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        host: configService.get<string>(`${serviceName}_HOST`, 'localhost'),
        port: configService.get<number>(`${serviceName}_PORT`, defaultPort),
      },
    };
  }

  static getRedisClientConfig(
    configService: ConfigService,
  ): ClientOptions {
    return {
      transport: Transport.REDIS,
      options: {
        host: configService.get<string>('REDIS_HOST', 'localhost'),
        port: configService.get<number>('REDIS_PORT', 6379),
        password: configService.get<string>('REDIS_PASSWORD'),
      },
    };
  }

  static getAuthServiceConfig(configService: ConfigService): ClientOptions {
    return this.getTcpClientConfig('AUTH_SERVICE', configService, 3001);
  }

  static getUserServiceConfig(configService: ConfigService): ClientOptions {
    return this.getTcpClientConfig('USER_SERVICE', configService, 3002);
  }

  static getChatServiceConfig(configService: ConfigService): ClientOptions {
    return this.getTcpClientConfig('CHAT_SERVICE', configService, 3003);
  }
}

// Health check utilities for microservices
export interface ServiceHealthStatus {
  name: string;
  status: 'healthy' | 'unhealthy' | 'unknown';
  lastCheck: Date;
  responseTime?: number;
  error?: string;
}

export class MicroserviceHealthChecker {
  private healthStatus = new Map<string, ServiceHealthStatus>();

  async checkServiceHealth(
    serviceName: string,
    client: any,
    timeout: number = 5000,
  ): Promise<ServiceHealthStatus> {
    const startTime = Date.now();
    
    try {
      // Send a ping/health check message to the service
      const result = await Promise.race([
        client.send('health.check', {}).toPromise(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), timeout)
        ),
      ]);

      const responseTime = Date.now() - startTime;
      
      const status: ServiceHealthStatus = {
        name: serviceName,
        status: 'healthy',
        lastCheck: new Date(),
        responseTime,
      };

      this.healthStatus.set(serviceName, status);
      return status;

    } catch (error) {
      const status: ServiceHealthStatus = {
        name: serviceName,
        status: 'unhealthy',
        lastCheck: new Date(),
        error: error.message,
      };

      this.healthStatus.set(serviceName, status);
      return status;
    }
  }

  getServiceHealth(serviceName: string): ServiceHealthStatus | undefined {
    return this.healthStatus.get(serviceName);
  }

  getAllServicesHealth(): ServiceHealthStatus[] {
    return Array.from(this.healthStatus.values());
  }

  isServiceHealthy(serviceName: string): boolean {
    const status = this.healthStatus.get(serviceName);
    return status?.status === 'healthy';
  }
}

// Circuit breaker pattern for microservices
export interface CircuitBreakerOptions {
  failureThreshold: number;
  successThreshold: number;
  timeout: number;
  resetTimeout: number;
}

export class CircuitBreaker {
  private failureCount = 0;
  private successCount = 0;
  private lastFailureTime?: Date;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

  constructor(private options: CircuitBreakerOptions) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (this.shouldAttemptReset()) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await Promise.race([
        operation(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Operation timeout')), this.options.timeout)
        ),
      ]);

      this.onSuccess();
      return result;

    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failureCount = 0;
    
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= this.options.successThreshold) {
        this.state = 'CLOSED';
        this.successCount = 0;
      }
    }
  }

  private onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = new Date();
    
    if (this.failureCount >= this.options.failureThreshold) {
      this.state = 'OPEN';
    }
  }

  private shouldAttemptReset(): boolean {
    if (!this.lastFailureTime) return false;
    
    const timeSinceLastFailure = Date.now() - this.lastFailureTime.getTime();
    return timeSinceLastFailure >= this.options.resetTimeout;
  }

  getState(): string {
    return this.state;
  }

  getFailureCount(): number {
    return this.failureCount;
  }
}