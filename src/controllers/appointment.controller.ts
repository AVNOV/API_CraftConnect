import { Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { Body, Delete, Get, Param, Patch } from "@nestjs/common/decorators";
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiCreatedResponse } from "@nestjs/swagger";
import { Appointment } from 'src/entities/appointment.entity';
import { AppointmentService } from 'src/services/appointment.service';

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @Post()
    @ApiCreatedResponse({ description: "Le rendez-vous a été créé avec succès."})
    @ApiBadRequestResponse({ description: "Une erreur s'est produite."})
    async create(@Body() appointment: Appointment): Promise<string> {
        try {
            await this.appointmentService.create(appointment);

            return "Le rendez-vous a été créé avec succès."
        } catch (error) {
            throw new HttpException(
                "Une erreur s'est produite.",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get()
    @ApiAcceptedResponse({ isArray: true, type: Appointment })
    async findAll(): Promise<Appointment[]> {
      return await this.appointmentService.findAll();
    }
  
    @Get('id')
    @ApiAcceptedResponse({ type: Appointment })
    async findOne(@Param('id') id: number): Promise<Appointment | null> {
      return await this.appointmentService.findOne(id);
    }
  
    @Patch(':id')
    @ApiAcceptedResponse({
      description: "Le rendez-vous a été mis à jour avec succès.",
    })
    @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
    async update(
      @Param('id') id: string,
      @Body() appointment: Appointment,
    ): Promise<string> {
      try {
        await this.appointmentService.update(parseInt(id), appointment);
  
        return "Le rendez-vous a été mis à jour avec succès.";
      } catch (error) {
        throw new HttpException(
          "Une erreur s'est produite.",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Delete(':id')
    @ApiAcceptedResponse({
      description: "Le rendez-vous a été supprimé avec succès.",
    })
    @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
    async delete(@Param('id') id: number): Promise<string> {
      try {
        await this.appointmentService.delete(id);
  
        return "Le rendez-vous a été supprimé avec succès.";
      } catch (error) {
        throw new HttpException(
          "Une erreur s'est produite.",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
}