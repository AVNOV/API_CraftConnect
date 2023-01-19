import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ArtisanSchedule } from 'src/entities/artisan_schedule.entity';
import { ArtisanSkill } from 'src/entities/artisan_skill.entity';

export class UpdateArtisanDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  company_name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  artisanSchedule: ArtisanSchedule;

  @IsOptional()
  @ApiProperty({ required: false })
  artisanSkill: ArtisanSkill;
}
