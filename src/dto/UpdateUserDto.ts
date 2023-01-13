import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

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
}
