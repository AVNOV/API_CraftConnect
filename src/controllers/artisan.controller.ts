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
  Request,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/auth/roles.enum';
import { CreateArtisanDto } from 'src/dto/CreateArtisanDto';
import { UpdateArtisanDto } from 'src/dto/UpdateArtisanDto';
import { Artisan } from 'src/entities/artisan.entity';
import { ArtisanService } from 'src/services/artisan.service';

@Controller('artisans')
export class ArtisanController {
  constructor(private readonly artisanService: ArtisanService) {}

  @Post()
  @ApiCreatedResponse({ description: "L'artisan a été créé avec succès." })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async create(
    @Body() artisan: CreateArtisanDto,
  ): Promise<{ message: string; artisan: Artisan }> {
    try {
      const newArtisan = await this.artisanService.create(artisan);

      return {
        message: "L'artisan a été créé avec succès.",
        artisan: newArtisan,
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
  async findAll(): Promise<Artisan[]> {
    return await this.artisanService.findAll();
  }

  @Get(':id')
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
    @Body() artisan: UpdateArtisanDto,
    @Request() req: any,
  ): Promise<string> {
    if (req.user.artisanId !== parseInt(id) && req.user.role === Role.User)
      throw new HttpException(
        "Vous n'avez pas le droit de faire ça.",
        HttpStatus.FORBIDDEN,
      );
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
  async delete(@Param('id') id: number, @Request() req: any): Promise<string> {
    if (req.user.artisanId !== id && req.user.role === Role.User) {
      throw new HttpException(
        "Vous n'avez pas le droit de faire ça.",
        HttpStatus.FORBIDDEN,
      );
    }
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
