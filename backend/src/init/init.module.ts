import { Module } from '@nestjs/common';
import { InitService } from './init.service';
import { InitController } from './init.controller';
import { UserRepository } from 'src/db/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [InitController],
  providers: [InitService, UserRepository],
})
export class InitModule {}
