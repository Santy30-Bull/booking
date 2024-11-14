/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { BookingModule } from './booking/booking.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(BookingModule);

  const configService = app.get(ConfigService); // Obtener ConfigService para manejar variables de entorno

  // Configuración para el microservicio (NATS)
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(BookingModule, {
      transport: Transport.NATS,
      options: { servers: [configService.get<string>('NATS_SERVER_URL')] }, // Obtener la URL del servidor NATS desde el .env
    });

  // Configurar el ValidationPipe global para el microservicio
  microservice.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configurar el ValidationPipe global para el servidor HTTP
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Escuchar en el microservicio NATS
  await microservice.listen();

  // Iniciar el servidor HTTP en el puerto configurado (puede ser 3001 u otro)
  const port = configService.get<number>('PORT'); // Usar el puerto configurado en .env
  await app.listen(port);

  // Manejar señales de terminación para ambos servicios
  process.on('SIGINT', async () => {
    await app.close();
    await microservice.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await app.close();
    await microservice.close();
    process.exit(0);
  });
}

bootstrap();
