import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '10mb' }));
  app.setGlobalPrefix('api');
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
