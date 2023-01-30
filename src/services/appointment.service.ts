import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentDto } from 'src/dto/CreateAppointmentDto';
import { UpdateAppointmentDto } from 'src/dto/UpdateAppointmentDto';
import { Appointment } from 'src/entities/appointment.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointment: Repository<Appointment>,
  ) {}

  async create(appointment: CreateAppointmentDto): Promise<Appointment> {
    const newAppointment = this.appointment.create(appointment);
    return await this.appointment.save(newAppointment);
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointment.find({ relations: ['artisan', 'client'] });
  }

  async findByUserOrArtisanId(
    userId = null,
    artisanId = null,
  ): Promise<Appointment[]> {
    return await this.appointment.find({
      where: { client: { id: userId }, artisan: { id: artisanId } },
      relations: ['artisan', 'client'],
    });
  }

  async findByArtisanId(id: number) {
    return await this.appointment.find({ where: { artisan: { id } } });
  }

  async findOne(id: number): Promise<Appointment | null> {
    return await this.appointment.findOne({
      where: { id },
      relations: ['artisan', 'client'],
    });
  }

  async update(
    id: number,
    appointment: UpdateAppointmentDto,
  ): Promise<UpdateResult> {
    return await this.appointment.update(id, appointment);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.appointment.delete(id);
  }
}
