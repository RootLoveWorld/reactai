import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatController } from './chat.controller';
import { SERVICE_NAMES } from '@shared';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAMES.CHAT_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: configService.get('CHAT_SERVICE_PORT', 3003),
          },
        }),
      },
    ]),
  ],
  controllers: [ChatController],
})
export class ChatModule {}