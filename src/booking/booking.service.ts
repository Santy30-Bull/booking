/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Booking } from './booking.model';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  async create(createBookingDto: CreateBookingDto) {
    const booking = new Booking();
    Object.assign(booking, createBookingDto);
    await booking.save();
    return booking;
  }

  async findAll(): Promise<Booking[]> {
    return Booking.findAll();
  }

  async findOne(id: number) {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    Object.assign(booking, updateBookingDto);
    await booking.save();
    return booking;
  }

  async remove(id: number) {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    await booking.destroy();
    return { message: `Booking with ID ${id} removed successfully` };
  }
}
