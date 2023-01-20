import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReasonAppointment } from './reason_appointment.entity';

@Entity()
export class ArtisanSkill {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @ApiProperty({ type: ReasonAppointment, isArray: true })
  @OneToMany(() => ReasonAppointment, (reason) => reason.artisanSkill)
  reasons: ReasonAppointment[];
}
