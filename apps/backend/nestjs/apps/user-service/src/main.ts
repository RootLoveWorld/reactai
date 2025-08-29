import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { UserModule } from './user.module';

async function bootstrap() {
  const logger = new Logger('UserService');
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: process.env.USER_SERVICE_PORT || 3002,
    },
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen();
  logger.log(`👤 User Service is running on port ${process.env.USER_SERVICE_PORT || 3002}`);
}

bootstrap().catch((error) => {
  console.error('Failed to start User Service:', error);
  process.exit(1);
});