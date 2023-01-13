import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtisanScheduleController } from 'src/controllers/artisan_schedule.controller';
import { ArtisanSchedule } from 'src/entities/artisan_schedule.entity';
import { ArtisanScheduleService } from 'src/services/artisan_schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtisanSchedule])],
  providers: [ArtisanScheduleService],
  controllers: [ArtisanScheduleController],
})
export class ArtisanScheduleModule {}
