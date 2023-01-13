import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtisanSchedule } from 'src/entities/artisan_schedule.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateArtisanScheduleDto } from 'src/dto/CreateArtisanScheduleDto';
import { UpdateArtisanScheduleDto } from 'src/dto/UpdateArtisanSchedule';

@Injectable()
export class ArtisanScheduleService {
  constructor(
    @InjectRepository(ArtisanSchedule)
    private artisanSchedule: Repository<ArtisanSchedule>,
  ) {}

  async create(
    artisanSchedule: CreateArtisanScheduleDto,
  ): Promise<ArtisanSchedule> {
    const newArtisan = this.artisanSchedule.create(artisanSchedule);
    return await this.artisanSchedule.save(newArtisan);
  }

  async findAll(): Promise<ArtisanSchedule[]> {
    return await this.artisanSchedule.find();
  }

  async findOne(id: number): Promise<ArtisanSchedule | null> {
    return await this.artisanSchedule.findOne({ where: { id } });
  }

  async update(
    id: number,
    artisanSchedule: UpdateArtisanScheduleDto,
  ): Promise<UpdateResult> {
    return await this.artisanSchedule.update(id, artisanSchedule);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.artisanSchedule.delete(id);
  }
}
