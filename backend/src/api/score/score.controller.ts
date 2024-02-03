import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ScoreService } from './score.service';
import {
  CreateScoreRequest,
  CreateScoreResponse,
} from 'src/db/score/score.dto';

@Controller('api/score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}
  @Get()
  async get() {
    return await this.scoreService.get();
  }

  @Post()
  async insertScore(
    @Body(new ValidationPipe()) input: CreateScoreRequest,
  ): Promise<CreateScoreResponse> {
    return await this.scoreService.insertScore(input);
  }
}
