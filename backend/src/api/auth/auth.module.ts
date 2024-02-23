import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/db/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/user/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AdminStrategy } from './guard/admin.strategy';
import { MemberStrategy } from './guard/member.strategy';
import { LocalStrategy } from './guard/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    MemberStrategy,
    AdminStrategy,
    LocalStrategy,
  ],
})
export class AuthModule {}
