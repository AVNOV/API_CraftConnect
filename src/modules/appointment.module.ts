import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentController } from 'src/controllers/appointment.controller';
import { Appointment } from 'src/entities/appointment.entity';
import { AppointmentService } from 'src/services/appointment.service';

@Module({
    imports: [TypeOrmModule.forFeature([Appointment])],
    providers: [AppointmentService],
    controllers: [AppointmentController],
})
export class AppointmentModule {}