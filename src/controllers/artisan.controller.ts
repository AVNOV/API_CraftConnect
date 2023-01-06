import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Artisan } from 'src/entities/artisan.entity';
import { ArtisanService } from 'src/services/artisan.service';

@Controller('artisan')
export class ArtisanController {
  constructor(private readonly artisanService: ArtisanService) {}

  @Post()
  @ApiCreatedResponse({ description: "L'artisan a été créé avec succès." })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async create(@Body() artisan: Artisan): Promise<string> {
    try {
      await this.artisanService.create(artisan);

      return "L'artisan a été créé avec succès.";
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiAcceptedResponse({ isArray: true, type: Artisan })
  async findAll(): Promise<Artisan[]> {
    return await this.artisanService.findAll();
  }

  @Get('id')
  @ApiAcceptedResponse({ type: Artisan })
  async findOne(@Param('id') id: number): Promise<Artisan | null> {
    return await this.artisanService.findOne(id);
  }

  @Patch(':id')
  @ApiAcceptedResponse({
    description: "L'artisan a été mis à jour avec succès.",
  })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async update(
    @Param('id') id: string,
    @Body() artisan: Artisan,
  ): Promise<string> {
    try {
      await this.artisanService.update(parseInt(id), artisan);

      return "L'artisan a été mis à jour avec succès.";
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiAcceptedResponse({
    description: "L'artisan a été supprimé avec succès.",
  })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async delete(@Param('id') id: number): Promise<string> {
    try {
      await this.artisanService.delete(id);

      return "L'artisan a été supprimé avec succès.";
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
