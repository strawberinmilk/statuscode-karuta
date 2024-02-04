import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import {
  CreateScoreRequest,
  CreateScoreResponse,
  UpdateScoreNameRequest,
} from 'src/api/score/dto/score.dto';
import { Score } from 'src/db/score/score.entity';

@Controller('api/score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get(':gameMode')
  async getAllByScore(@Param('gameMode') gameMode: string): Promise<Score[]> {
    return await this.scoreService.getAllByScore(gameMode);
  }

  @Post()
  async insertScore(
    @Body(new ValidationPipe()) input: CreateScoreRequest,
  ): Promise<CreateScoreResponse> {
    return await this.scoreService.insertScore(input);
  }

  @Put()
  async setName(
    @Body(new ValidationPipe()) input: UpdateScoreNameRequest,
  ): Promise<void> {
    return await this.scoreService.setName(input);
  }

  // デバッグ用
  // @Delete(':id')
  // async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
  //   await this.scoreService.delete(id);
  // }
}
