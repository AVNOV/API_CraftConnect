import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common/decorators';
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
import { Appointment } from 'src/entities/appointment.entity';
import { AppointmentService } from 'src/services/appointment.service';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ description: 'Le rendez-vous a été créé avec succès.' })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async create(
    @Body() appointment: Appointment,
  ): Promise<{ message: string; appointment: Appointment }> {
    try {
      const newAppointment = await this.appointmentService.create(appointment);

      return {
        message: 'Le rendez-vous a été créé avec succès.',
        appointment: newAppointment,
      };
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Get()
  @ApiAcceptedResponse({ isArray: true, type: Appointment })
  async findAll(): Promise<Appointment[]> {
    return await this.appointmentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('id')
  @ApiAcceptedResponse({ type: Appointment })
  async findOne(@Param('id') id: number): Promise<Appointment | null> {
    return await this.appointmentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiAcceptedResponse({
    description: 'Le rendez-vous a été mis à jour avec succès.',
  })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async update(
    @Param('id') id: string,
    @Body() appointments: Appointment,
    @Request() req: any,
  ): Promise<string> {
    const appointment = await this.appointmentService.findOne(parseInt(id));
    if (
      req.user.id !== appointment.client &&
      req.user.artisanId !== appointment.artisan &&
      req.user.role === Role.User
    ) {
      throw new HttpException(
        "Vous n'avez pas le droit de faire ça.",
        HttpStatus.FORBIDDEN,
      );
    }
    try {
      await this.appointmentService.update(parseInt(id), appointments);

      return 'Le rendez-vous a été mis à jour avec succès.';
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
    description: 'Le rendez-vous a été supprimé avec succès.',
  })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async delete(@Param('id') id: number, @Request() req: any): Promise<string> {
    const appointment = await this.appointmentService.findOne(id);
    if (
      req.user.id !== appointment.client &&
      req.user.artisanId !== appointment.artisan &&
      req.user.role === Role.User
    ) {
      throw new HttpException(
        "Vous n'avez pas le droit de faire ça.",
        HttpStatus.FORBIDDEN,
      );
    }
    try {
      await this.appointmentService.delete(id);

      return 'Le rendez-vous a été supprimé avec succès.';
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
