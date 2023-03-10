import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user.module';
import { User } from './entities/user.entity';
import { Artisan } from './entities/artisan.entity';
import { ArtisanModule } from './modules/artisan.module';
import { AuthModule } from './auth/modules/auth.module';
import { ArtisanSchedule } from './entities/artisan_schedule.entity';
import { ArtisanScheduleModule } from './modules/artisan_schedule.module';
import { Appointment } from './entities/appointment.entity';
import { AppointmentModule } from './modules/appointment.module';
import { ArtisanSkill } from './entities/artisan_skill.entity';
import { ArtisanSkillModule } from './modules/artisan_skill.module';
import { ReasonAppointment } from './entities/reason_appointment.entity';
import { ReasonModule } from './modules/reason_appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        User,
        Artisan,
        ArtisanSchedule,
        ArtisanSkill,
        Appointment,
        ReasonAppointment,
      ],
      synchronize: true,
    }),
    UserModule,
    ArtisanModule,
    AuthModule,
    AppointmentModule,
    ArtisanScheduleModule,
    ArtisanSkillModule,
    ReasonModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
