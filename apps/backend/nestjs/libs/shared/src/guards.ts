import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IS_PUBLIC_KEY } from './decorators';
import { MESSAGE_PATTERNS, SERVICE_NAMES } from './constants';
import { ITokenValidationResponse } from './interfaces';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(SERVICE_NAMES.AUTH_SERVICE) private authClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const result: ITokenValidationResponse = await firstValueFrom(
        this.authClient.send(MESSAGE_PATTERNS.AUTH.VALIDATE_TOKEN, { token }),
      );

      if (!result.valid) {
        throw new UnauthorizedException('Invalid token');
      }

      request.user = result.payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token validation failed');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    @Inject(SERVICE_NAMES.AUTH_SERVICE) private authClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const token = client.handshake?.auth?.token || client.handshake?.headers?.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      const result: ITokenValidationResponse = await firstValueFrom(
        this.authClient.send(MESSAGE_PATTERNS.AUTH.VALIDATE_TOKEN, { token }),
      );

      if (result.valid) {
        client.user = result.payload;
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}