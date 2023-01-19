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
  UseGuards,
  Request,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { UpdateUserDto } from 'src/dto/UpdateUserDto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ description: "L'utilisateur a été créé avec succès." })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async create(
    @Body() user: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    try {
      const newUser = await this.userService.create(user);

      return {
        message: "L'utilisateur a été mis à jour avec succès.",
        user: newUser,
      };
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Get()
  @ApiAcceptedResponse({ isArray: true, type: User })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiAcceptedResponse({ type: User })
  async findOne(
    @Param('id') id: number,
    @Request() req: any,
  ): Promise<User | null> {
    if (req.user.sub !== id && req.user.role === Role.User) {
      throw new HttpException(
        "Vous n'avez pas le droit de faire ça.",
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiAcceptedResponse({
    description: "L'utilisateur a été mis à jour avec succès.",
  })
  @ApiBadRequestResponse({ description: "Une erreur s'est produite." })
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
    @Request() req: any,
  ): Promise<string> {
    if (req.user.sub !== parseInt(id) && req.user.role === Role.User) {
      throw new HttpException(
        "Vous n'avez pas le droit de faire ça.",
        HttpStatus.FORBIDDEN,
      );
    }
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

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
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
