import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ArtisanSchedule } from 'src/entities/artisan_schedule.entity';

export class CreateArtisanDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  company_name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  artisanSchedule: ArtisanSchedule;
}
