import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Enable global validation pipe
    app.useGlobalPipes(new ValidationPipe({
      transform: true,  // Automatically transform payload to DTO type
      whitelist: true,  // Strip properties not in DTO
    }));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
