import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReasonAppointment } from "src/entities/reason_appointment.entity";
import { DeleteResult, UpdateResult } from 'typeorm';
import { Repository } from "typeorm";

@Injectable()
export class ReasonService {
    constructor(
        @InjectRepository(ReasonAppointment)
        private reasonAppointment: Repository<ReasonAppointment>
    ) {}

    async create(reasonAppointment: ReasonAppointment): Promise<ReasonAppointment> {
        const newReason = this.reasonAppointment.create(reasonAppointment);
        return await this.reasonAppointment.save(newReason);
    }

    async findAll(): Promise<ReasonAppointment[]> {
        return await this.reasonAppointment.find();
    }
    
    async findOne(id: number): Promise<ReasonAppointment | null> {
        return await this.reasonAppointment.findOne({ where: { id } });
    }
    
    async update(id: number, reason: ReasonAppointment): Promise<UpdateResult> {
        return await this.reasonAppointment.update(id, reason);
    }
    
    async delete(id: number): Promise<DeleteResult> {
        return await this.reasonAppointment.delete(id);
    }
}


