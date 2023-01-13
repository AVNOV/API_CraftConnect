import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArtisanDto } from 'src/dto/CreateArtisanDto';
import { UpdateArtisanDto } from 'src/dto/UpdateArtisanDto';
import { Artisan } from 'src/entities/artisan.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ArtisanService {
  constructor(
    @InjectRepository(Artisan)
    private artisan: Repository<Artisan>,
  ) {}

  async create(artisan: CreateArtisanDto): Promise<Artisan> {
    const newArtisan = this.artisan.create(artisan);
    return await this.artisan.save(newArtisan);
  }

  async findAll(): Promise<Artisan[]> {
    return await this.artisan.find();
  }

  async findOne(id: number): Promise<Artisan | null> {
    return await this.artisan.findOne({
      where: { id },
      relations: ['artisanSchedule'],
    });
  }

  async update(id: number, artisan: UpdateArtisanDto): Promise<UpdateResult> {
    return await this.artisan.update(id, artisan);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.artisan.delete(id);
  }
}
