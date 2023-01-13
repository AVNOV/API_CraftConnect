import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateArtisanScheduleDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  days_of_week_enable: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  hours_of_day_enable: string;
}
