/* eslint-disable prettier/prettier */
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigModule y ConfigService
import { Booking } from './booking.model';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

@Module({
  imports: [
    ConfigModule.forRoot(), // Agrega ConfigModule para cargar variables de entorno
    SequelizeModule.forRootAsync({
      imports: [ConfigModule], // Asegura que ConfigModule esté disponible
      inject: [ConfigService], // Inyecta ConfigService
      useFactory: (configService: ConfigService) => ({
        dialect: 'sqlite',
        storage: configService.get<string>('DATABASE_URL'), // Usa DATABASE_URL de .env
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    SequelizeModule.forFeature([Booking]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
