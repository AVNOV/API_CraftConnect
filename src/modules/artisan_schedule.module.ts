import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtisanScheduleController } from 'src/controllers/artisan_schedule.controller';
import { Artisan } from 'src/entities/artisan.entity';
import { ArtisanSchedule } from 'src/entities/artisan_schedule.entity';
import { ArtisanService } from 'src/services/artisan.service';
import { ArtisanScheduleService } from 'src/services/artisan_schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtisanSchedule, Artisan])],
  providers: [ArtisanScheduleService, ArtisanService],
  controllers: [ArtisanScheduleController],
})
export class ArtisanScheduleModule {}
