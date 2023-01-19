import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtisanSkill } from './artisan_skill.entity';

@Entity()
export class ReasonAppointment {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @ApiProperty({ type: () => ArtisanSkill })
  @ManyToOne(() => ArtisanSkill, (artisanSkill) => artisanSkill.reasons)
  artisanSkill: ArtisanSkill;
}
