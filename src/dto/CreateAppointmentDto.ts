import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Artisan } from 'src/entities/artisan.entity';
import { User } from 'src/entities/user.entity';

export class CreateAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  client: User;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  artisan: Artisan;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  day: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  hour: number;

  @IsEnum(['accepted', 'waiting'])
  @ApiProperty()
  status: 'accepted' | 'waiting';

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  reason: string;
}
