import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/roles.enum';
import { ArtisanSkill } from 'src/entities/artisan_skill.entity';
import { ArtisanSkillService } from 'src/services/artisan_skill.service';

@Controller('artisan_skill')
export class ArtisanSkillController {
  constructor(private readonly artisanSkillService: ArtisanSkillService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
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

  @Get(':name')
  @ApiAcceptedResponse({ type: ArtisanSkill })
  async findOne(@Param('name') name: string): Promise<ArtisanSkill | null> {
    return await this.artisanSkillService.findOne(name);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiAcceptedResponse({
    description: "Le type d'artisan a été supprimé avec succès.",
  })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async delete(@Param('id') id: string): Promise<string> {
    try {
      await this.artisanSkillService.delete(parseInt(id));

      return "Le type d'artisan a été supprimé avec succès/";
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
