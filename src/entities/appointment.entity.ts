import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';
import { Artisan } from './artisan.entity';

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @ApiProperty()
    @OneToOne(() => User)
    @JoinColumn()
    client_id: User;

    @ApiProperty()
    @OneToOne(() => Artisan)
    @JoinColumn()
    artisan_id: Artisan;

    @Column()
    @ApiProperty()
    adress: string;

    @Column()
    @ApiProperty()
    day: Date;

    @Column()
    @ApiProperty()
    hour: number;

    @Column()
    @ApiProperty()
    status: Enumerator;
}