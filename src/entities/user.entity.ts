import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Artisan } from './artisan.entity';
import { Role } from 'src/auth/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  firstname: string;

  @Column()
  @ApiProperty()
  lastname: string;

  @Column()
  @ApiProperty()
  city: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  phone_number: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ default: Role.User })
  @ApiProperty()
  role: string;

  @ApiProperty()
  @OneToOne(() => Artisan, (artisan) => artisan.user)
  @JoinColumn()
  artisan: Artisan;

  @Column({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty()
  updated_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;
}
