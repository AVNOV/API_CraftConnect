import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { jwtConstants } from '../constants';
import { JwtStrategy } from '../strategies/jwt.stategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
