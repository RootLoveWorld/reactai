import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ChatModule } from './chat.module';

async function bootstrap() {
  const logger = new Logger('ChatService');
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ChatModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: process.env.CHAT_SERVICE_PORT || 3003,
    },
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen();
  logger.log(`💬 Chat Service is running on port ${process.env.CHAT_SERVICE_PORT || 3003}`);
}

bootstrap().catch((error) => {
  console.error('Failed to start Chat Service:', error);
  process.exit(1);
});