import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [EventModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
