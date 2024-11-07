/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  eventName: string;

  @IsNotEmpty()
  @IsDateString()
  eventDate: Date;

  @IsNotEmpty()
  @IsString()
  guestName: string;

  @IsNotEmpty()
  @IsEmail()
  guestEmail: string;

  @IsInt()
  guestCount: number;

  @IsString()
  specialRequests?: string;
}
