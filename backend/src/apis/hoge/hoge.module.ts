import { Module } from '@nestjs/common';
import { HogeService } from './hoge.service';
import { HogeController } from './hoge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from 'src/db/sample/sample.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  controllers: [HogeController],
  providers: [HogeService],
})
export class HogeModule {}
