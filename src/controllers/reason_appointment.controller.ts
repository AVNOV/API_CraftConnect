import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
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
import { ReasonAppointment } from 'src/entities/reason_appointment.entity';
import { ReasonService } from 'src/services/reason_appointment.service';

@Controller('reasons')
export class ReasonController {
  constructor(private readonly reasonService: ReasonService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({
    description: 'La raison du rendez-vous a été créée avec succès.',
  })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async create(
    @Body() reason: ReasonAppointment,
  ): Promise<{ message: string; reason: ReasonAppointment }> {
    try {
      const newReason = await this.reasonService.create(reason);

      return {
        message: 'La raison du rendez-vous a été créée avec succès.',
        reason: newReason,
      };
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiAcceptedResponse({ isArray: true, type: ReasonAppointment })
  async findAll(): Promise<ReasonAppointment[]> {
    return await this.reasonService.findAll();
  }

  @Get('id')
  @ApiAcceptedResponse({ type: ReasonAppointment })
  async findOne(@Param('id') id: string): Promise<ReasonAppointment | null> {
    return await this.reasonService.findOne(parseInt(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiAcceptedResponse({
    description: 'Raison mise à jour avec succès.',
  })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async update(
    @Param('id') id: string,
    @Body() reason: ReasonAppointment,
  ): Promise<string> {
    try {
      await this.reasonService.update(parseInt(id), reason);

      return 'Raison mise à jour avec succès.';
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiAcceptedResponse({
    description: 'Raison supprimée avec succès.',
  })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async delete(@Param('id') id: string): Promise<string> {
    try {
      await this.reasonService.delete(parseInt(id));

      return 'Raison supprimée avec succès.';
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
