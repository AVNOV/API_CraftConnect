import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ArtisanSchedule } from 'src/entities/artisan_schedule.entity';
import { ArtisanSkill } from 'src/entities/artisan_skill.entity';

export class CreateArtisanDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  company_name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  artisanSchedule: ArtisanSchedule;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  artisanSkill: ArtisanSkill;
}
