/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingModule } from './booking/booking.module';
import { ConfigModule } from '@nestjs/config'; // Importa ConfigModule

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Especifica la ruta del archivo .env
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),
    BookingModule, // Asegúrate de que el BookingModule esté importado
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
