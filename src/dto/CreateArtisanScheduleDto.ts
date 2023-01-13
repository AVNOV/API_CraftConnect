import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArtisanScheduleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  days_of_week_enable: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  hours_of_day_enable: string;
}
