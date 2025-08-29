import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { IJwtPayload } from './interfaces';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IJwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const GetUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.sub;
  },
);

export const ApiResponseWrapper = (description: string, type?: any) => {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    // This is a placeholder for API response decoration
    // In a real implementation, you might want to integrate with Swagger decorators
    return descriptor;
  };
};