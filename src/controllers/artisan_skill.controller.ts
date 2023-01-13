import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { ArtisanSkill } from 'src/entities/artisan_skill.entity';
import { ArtisanSkillService } from 'src/services/artisan_skill.service';

@Controller('artisan_skill')
export class ArtisanSkillController {
  constructor(private readonly artisanSkillService: ArtisanSkillService) {}

  @Post()
  @ApiCreatedResponse({
    description: "Le type d'artisan a été créé avec succès.",
  })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async create(
    @Body() artisanSkill: ArtisanSkill,
  ): Promise<{ message: string; artisan_schedule: ArtisanSkill }> {
    try {
      const newSchedule = await this.artisanSkillService.create(artisanSkill);

      return {
        message: "Le type d'artisan a été créé avec succès.",
        artisan_schedule: newSchedule,
      };
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiAcceptedResponse({ isArray: true, type: ArtisanSkill })
  async findAll(): Promise<ArtisanSkill[]> {
    return await this.artisanSkillService.findAll();
  }

  @Get(':id')
  @ApiAcceptedResponse({ type: ArtisanSkill })
  async findOne(@Param('id') id: number): Promise<ArtisanSkill | null> {
    return await this.artisanSkillService.findOne(id);
  }
}
