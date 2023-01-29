import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Artisan } from 'src/entities/artisan.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  firstname: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  lastname: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  city: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  password: string;

  @IsPhoneNumber('FR')
  @IsOptional()
  @ApiProperty({ required: false })
  phone_number: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, type: 'number' })
  artisan: Artisan;
}
