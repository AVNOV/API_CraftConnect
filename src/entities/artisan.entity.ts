import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtisanSchedule } from './artisan_schedule.entity';

@Entity()
export class Artisan {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  company_name: string;

  @ApiProperty()
  @OneToOne(() => ArtisanSchedule)
  @JoinColumn()
  artisanSchedule: ArtisanSchedule;
}
