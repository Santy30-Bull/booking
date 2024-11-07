/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @MessagePattern({ cmd: 'create_booking' })
  async create(@Payload() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @MessagePattern({ cmd: 'find_all_bookings' })
  async findAll() {
    return this.bookingService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_booking' })
  async findOne(@Payload() payload: { id: string }) {
    return this.bookingService.findOne(+payload.id);
  }

  @MessagePattern({ cmd: 'update_booking' })
  async update(@Payload() payload: { id: string; data: UpdateBookingDto }) {
    return this.bookingService.update(+payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_booking' })
  async remove(@Payload() payload: { id: string }) {
    return this.bookingService.remove(+payload.id);
  }
}
