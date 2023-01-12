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
  UseGuards,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Artisan } from 'src/entities/artisan.entity';
import { ArtisanService } from 'src/services/artisan.service';

@Controller('artisans')
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiAcceptedResponse({ isArray: true, type: Artisan })
  async findAll(): Promise<Artisan[]> {
    return await this.artisanService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('id')
  @ApiAcceptedResponse({ type: Artisan })
  async findOne(@Param('id') id: number): Promise<Artisan | null> {
    return await this.artisanService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
