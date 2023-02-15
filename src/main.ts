import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Esto deja solo la data que estoy esperando según mi DTO
      whitelist: true,
      // Esto lanza el error cuando envían propiedades que NO quiero recibir
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
main();
