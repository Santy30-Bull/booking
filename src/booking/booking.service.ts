/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Booking } from './booking.model';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  // Método para crear una nueva reserva
  async create(createBookingDto: CreateBookingDto) {
    const booking = new Booking();
    Object.assign(booking, createBookingDto);
    await booking.save();
    return booking;
  }

  // Obtener todas las reservas
  async findAll(): Promise<Booking[]> {
    return Booking.findAll();
  }

  // Obtener una reserva por ID
  async findOne(id: number) {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  // Actualizar una reserva
  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    Object.assign(booking, updateBookingDto);
    await booking.save();
    return booking;
  }

  // Eliminar una reserva
  async remove(id: number) {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    await booking.destroy();
    return { message: `Booking with ID ${id} removed successfully` };
  }

  // Manejo de eventos enviados por LiquorService a través de NATS
  @MessagePattern('liquor_created_event') // Escucha el evento de creación de licor
  handleLiquorCreated(data: any) {
    this.logger.log(`Received liquor created event: ${data.data.message}`);
    // Aquí se puede hacer cualquier lógica adicional que necesites, como registrar el mensaje en una base de datos
  }

  @MessagePattern('liquor_updated_event') // Escucha el evento de actualización de licor
  handleLiquorUpdated(data: any) {
    this.logger.log(`Received liquor updated event: ${data.data.message}`);
  }

  @MessagePattern('liquor_deleted_event') // Escucha el evento de eliminación de licor
  handleLiquorDeleted(data: any) {
    this.logger.log(`Received liquor deleted event: ${data.data.message}`);
  }
}
