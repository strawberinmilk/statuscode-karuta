import { Body, Controller, Get, Post } from '@nestjs/common';
import { HogeService } from './hoge.service';

@Controller('api/hoge')
export class HogeController {
  constructor(private readonly hogeService: HogeService) {}
  @Get()
  async get() {
    return await this.hogeService.get();
  }
  @Post()
  async post(@Body() input) {
    return await this.hogeService.post(input);
  }
}
