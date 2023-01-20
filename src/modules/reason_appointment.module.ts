import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReasonController } from "src/controllers/reason_appointment.controller";
import { ReasonAppointment } from "src/entities/reason_appointment.entity";
import { ReasonService } from "src/services/reason_appointment.service";

@Module({
    imports: [TypeOrmModule.forFeature([ReasonAppointment])],
    providers: [ReasonService],
    controllers: [ReasonController],
})
export class ReasonModule {}