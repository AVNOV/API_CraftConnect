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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/auth/roles.enum';
import { CreateAppointmentDto } from 'src/dto/CreateAppointmentDto';
import { UpdateAppointmentDto } from 'src/dto/UpdateAppointmentDto';
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
    @Body() appointment: CreateAppointmentDto,
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiAcceptedResponse({ isArray: true, type: Appointment })
  async findAll(@Request() req: any): Promise<Appointment[]> {
    if (req.user.role === Role.Admin) {
      return await this.appointmentService.findAll();
    } else {
      const userId = req.user.id;
      const artisanId = req.user.artisanId;

      return await this.appointmentService.findByUserOrArtisanId(
        userId,
        artisanId,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/artisans/:id')
  @ApiAcceptedResponse({ isArray: true, type: Appointment })
  async findAllAppointmentsOfArtisan(
    @Param('id') id: string,
  ): Promise<Appointment[]> {
    return await this.appointmentService.findByArtisanId(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiAcceptedResponse({ type: Appointment })
  async findOne(@Param('id') id: string): Promise<Appointment | null> {
    return await this.appointmentService.findOne(parseInt(id));
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
    @Body() appointmentDto: UpdateAppointmentDto,
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
      await this.appointmentService.update(parseInt(id), appointmentDto);

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
  async delete(@Param('id') id: string, @Request() req: any): Promise<string> {
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
      await this.appointmentService.delete(parseInt(id));

      return 'Le rendez-vous a été supprimé avec succès.';
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
