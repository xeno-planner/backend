import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.FRONT_END_HOST],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  await app.listen(3001);
}
bootstrap();
