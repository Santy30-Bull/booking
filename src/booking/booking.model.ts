/* eslint-disable prettier/prettier */
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Booking extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  eventId: number;

  @Column
  eventName: string;

  @Column
  eventDate: Date;

  @Column
  guestName: string;

  @Column
  guestEmail: string;

  @Column
  guestCount: number;

  @Column
  specialRequests: string;
}
