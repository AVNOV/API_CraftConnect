import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtisanSkillController } from 'src/controllers/artisan_skill.controller';
import { ArtisanSkill } from 'src/entities/artisan_skill.entity';
import { ArtisanSkillService } from 'src/services/artisan_skill.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtisanSkill])],
  providers: [ArtisanSkillService],
  controllers: [ArtisanSkillController],
})
export class ArtisanSkillModule {}
