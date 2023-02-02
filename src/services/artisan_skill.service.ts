import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtisanSkill } from 'src/entities/artisan_skill.entity';
import { DeleteResult, Like, Repository } from 'typeorm';

@Injectable()
export class ArtisanSkillService {
  constructor(
    @InjectRepository(ArtisanSkill)
    private artisanSkill: Repository<ArtisanSkill>,
  ) {}

  async create(artisanSkill: ArtisanSkill): Promise<ArtisanSkill> {
    const newArtisanSkill = this.artisanSkill.create(artisanSkill);
    return await this.artisanSkill.save(newArtisanSkill);
  }

  async findAll(): Promise<ArtisanSkill[]> {
    return await this.artisanSkill.find({
      relations: ['reasons', 'artisans.user'],
    });
  }

  async findOne(name: string): Promise<ArtisanSkill | null> {
    return await this.artisanSkill.findOne({
      where: { name: Like(`%${name}%`) },
      relations: ['reasons', 'artisans.user'],
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.artisanSkill.delete(id);
  }
}
