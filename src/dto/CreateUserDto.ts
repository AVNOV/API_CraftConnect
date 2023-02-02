import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Artisan } from 'src/entities/artisan.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsPhoneNumber('FR')
  @IsNotEmpty()
  @ApiProperty()
  phone_number: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, type: 'number' })
  artisan: Artisan;
}
