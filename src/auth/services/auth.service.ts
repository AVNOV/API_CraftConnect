import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtTokenService: JwtService,
  ) {}

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        user?.password || '',
      );
      if (!isPasswordMatching || !user) {
        throw new HttpException(
          "L'email ou le mot de passe ne correspond pas.",
          HttpStatus.BAD_REQUEST,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  public async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }
}
