import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/db/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/user/user.entity';
import { GuardsModule } from 'src/guards/guards.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), GuardsModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
