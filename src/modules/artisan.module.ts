import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtisanController } from 'src/controllers/artisan.controller';
import { Artisan } from 'src/entities/artisan.entity';
import { ArtisanService } from 'src/services/artisan.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artisan])],
  providers: [ArtisanService],
  controllers: [ArtisanController],
  exports: [ArtisanService],
})
export class ArtisanModule {}
