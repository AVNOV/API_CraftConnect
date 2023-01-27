import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAppointmentDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  day: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  hour: number;

  @IsEnum(['accepted', 'waiting'])
  @IsOptional()
  @ApiProperty({ required: false })
  status: 'accepted' | 'waiting';
}
