import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { corsOptions } from './config/corsOptions';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/v1');
  app.set('query parser', 'extended');
  app.enableCors(corsOptions);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
