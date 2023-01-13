import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Appointment } from "src/entities/appointment.entity";
import { DeleteResult, UpdateResult } from 'typeorm';
import { Repository } from "typeorm";

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment)
        private appointment: Repository<Appointment>
    ) {}

    async create(appointment: Appointment): Promise<Appointment> {
        const newAppointment = this.appointment.create(appointment);
        return await this.appointment.save(newAppointment);
    }

    async findAll(): Promise<Appointment[]> {
        return await this.appointment.find();
    }
    
    async findOne(id: number): Promise<Appointment | null> {
        return await this.appointment.findOne({ where: { id } });
    }
    
    async update(id: number, artisan: Appointment): Promise<UpdateResult> {
        return await this.appointment.update(id, artisan);
    }
    
    async delete(id: number): Promise<DeleteResult> {
        return await this.appointment.delete(id);
    }

}