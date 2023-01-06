import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ description: "L'utilisateur a été créé avec succès." })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async create(@Body() user: User): Promise<string> {
    try {
      await this.userService.create(user);

      return "L'utilisateur a été créé avec succès.";
    } catch (error) {
      if (error?.code === '23505') {
        throw new HttpException(
          "L'email utilisé existe déjà.",
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiAcceptedResponse({ isArray: true, type: User })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiAcceptedResponse({ type: User })
  async findOne(@Param('id') id: number): Promise<User | null> {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiAcceptedResponse({
    description: "L'utilisateur a été mis à jour avec succès.",
  })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async update(@Param('id') id: string, @Body() user: User): Promise<string> {
    try {
      await this.userService.update(parseInt(id), user);

      return "L'utilisateur a été mis à jour avec succès.";
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiAcceptedResponse({
    description: "L'utilisateur a été supprimé avec succès.",
  })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async delete(@Param('id') id: number): Promise<string> {
    try {
      await this.userService.delete(id);

      return "L'utilisateur a été supprimé avec succès.";
    } catch (error) {
      throw new HttpException(
        "Une erreur s'est produite.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
