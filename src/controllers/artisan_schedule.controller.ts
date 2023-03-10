import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateArtisanScheduleDto } from 'src/dto/CreateArtisanScheduleDto';
import { UpdateArtisanScheduleDto } from 'src/dto/UpdateArtisanSchedule';
import { Artisan } from 'src/entities/artisan.entity';
import { ArtisanSchedule } from 'src/entities/artisan_schedule.entity';
import { ArtisanService } from 'src/services/artisan.service';
import { ArtisanScheduleService } from 'src/services/artisan_schedule.service';

@Controller('artisan_schedules')
export class ArtisanScheduleController {
  constructor(
    private readonly artisanScheduleService: ArtisanScheduleService,
    private readonly artisanService: ArtisanService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ description: 'Le planning a été créé avec succès.' })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async create(
    @Body() artisanSchedule: CreateArtisanScheduleDto,
    @Request() req: any,
  ): Promise<{ message: string; artisan_schedule: ArtisanSchedule }> {
    if (req.user.artisanId === null) {
      throw new HttpException(
        "Vous n'avez pas le droit de faire ça.",
        HttpStatus.FORBIDDEN,
      );
    }
    try {
      const newSchedule = await this.artisanScheduleService.create(
        artisanSchedule,
      );

      return {
        message: 'Le planning a été créé avec succès.',
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
  @ApiAcceptedResponse({ isArray: true, type: Artisan })
  async findAll(): Promise<ArtisanSchedule[]> {
    return await this.artisanScheduleService.findAll();
  }

  @Get(':id')
  @ApiAcceptedResponse({ type: ArtisanSchedule })
  async findOne(@Param('id') id: string): Promise<ArtisanSchedule | null> {
    return await this.artisanScheduleService.findOne(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiAcceptedResponse({
    description: 'Le planning a été mis à jour avec succès.',
  })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async update(
    @Param('id') id: string,
    @Body() artisanSchedule: UpdateArtisanScheduleDto,
    @Request() req: any,
  ): Promise<string> {
    const artisan = await this.artisanService.findOne(req.user.artisanId);
    if (!artisan || artisan.artisanSchedule.id !== parseInt(id)) {
      throw new HttpException(
        "Vous n'avez pas le droit de faire ça.",
        HttpStatus.FORBIDDEN,
      );
    }
    try {
      await this.artisanScheduleService.update(parseInt(id), artisanSchedule);

      return 'Le planning a été mis à jour avec succès.';
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
