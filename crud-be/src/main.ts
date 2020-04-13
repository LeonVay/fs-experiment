import * as config from 'config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const server = process.env.SERVER_PORT || config.get('server');

  const app = await NestFactory.create(AppModule);
  await app.listen(server.port);
}
bootstrap();
