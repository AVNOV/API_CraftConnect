import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArtisanSchedule {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  days_of_week_enable: string;

  @Column()
  @ApiProperty()
  hours_of_day_enable: string;
}
