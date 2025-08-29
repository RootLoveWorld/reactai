import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersController } from './users.controller';
import { SERVICE_NAMES } from '@shared';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAMES.USER_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: configService.get('USER_SERVICE_PORT', 3002),
          },
        }),
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}