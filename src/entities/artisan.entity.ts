import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtisanSchedule } from './artisan_schedule.entity';
import { ArtisanSkill } from './artisan_skill.entity';
import { User } from './user.entity';

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

  @ApiProperty()
  @OneToOne(() => ArtisanSkill)
  @JoinColumn()
  artisanSkill: ArtisanSkill;

  @OneToOne(() => User, (user) => user.artisan)
  user: User;
}
