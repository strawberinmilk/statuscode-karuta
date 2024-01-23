import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { HogeService } from './hoge.service';
import { CreateSampleDto } from 'src/db/sample/sample.dto';

@Controller('api/hoge')
export class HogeController {
  constructor(private readonly hogeService: HogeService) {}
  @Get()
  async get() {
    return await this.hogeService.get();
  }
  @Post()
  async post(@Body(new ValidationPipe()) input: CreateSampleDto) {
    return await this.hogeService.post(input);
  }
}
