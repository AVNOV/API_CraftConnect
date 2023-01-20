import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Artisan } from './artisan.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty({ type: User })
  @OneToOne(() => User)
  @JoinColumn()
  client: User;

  @ApiProperty({ type: Artisan })
  @OneToOne(() => Artisan)
  @JoinColumn()
  artisan: Artisan;

  @Column()
  @ApiProperty()
  adress: string;

  @Column()
  @ApiProperty()
  day: Date;

  @Column()
  @ApiProperty()
  hour: number;

  @Column({ type: 'enum', enum: ['accepted', 'waiting'] })
  @ApiProperty()
  status: 'accepted' | 'waiting';

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  reason: string;
}
