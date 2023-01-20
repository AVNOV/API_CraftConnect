import { Controller, Post, Get, Patch, Delete, Body, Param, HttpException, HttpStatus } from "@nestjs/common";
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiCreatedResponse } from "@nestjs/swagger";
import { ReasonAppointment } from "src/entities/reason_appointment.entity";
import { ReasonService } from "src/services/reason_appointment.service";

@Controller('reason')
export class ReasonController {
    constructor(private readonly reasonService: ReasonService) {}

    @Post()
    @ApiCreatedResponse({ description: "La raison du rendez-vous a été créée avec succès."})
    @ApiBadRequestResponse({ description: "Une erreur s'est produite."})
    async create(@Body() reason: ReasonAppointment): Promise<string> {
        try {
            await this.reasonService.create(reason);

            return "Raison a été créée avec succès."
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
    async findOne(@Param('id') id: number): Promise<ReasonAppointment | null> {
      return await this.reasonService.findOne(id);
    }
  
    @Patch(':id')
    @ApiAcceptedResponse({
      description: "Raison mise à jour avec succès.",
    })
    @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
    async update(
      @Param('id') id: string,
      @Body() reason: ReasonAppointment,
    ): Promise<string> {
      try {
        await this.reasonService.update(parseInt(id), reason);
  
        return "Raison mise à jour avec succès.";
      } catch (error) {
        throw new HttpException(
          "Une erreur s'est produite.",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Delete(':id')
    @ApiAcceptedResponse({
      description: "Raison supprimée avec succès.",
    })
    @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
    async delete(@Param('id') id: number): Promise<string> {
      try {
        await this.reasonService.delete(id);
  
        return "Raison supprimée avec succès.";
      } catch (error) {
        throw new HttpException(
          "Une erreur s'est produite.",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

} 