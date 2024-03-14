import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import {
  CreateScoreRequest,
  CreateScoreResponse,
  UpdateScoreNameRequest,
} from 'src/api/score/dto/score.dto';
import { Score } from 'src/db/score/score.entity';
import { AdminAuthGuard } from 'src/guards/guard/admin.guard';
import { MemberAuthGuard } from 'src/guards/guard/member.guard';
import { PasswordOmitUser } from '../auth/dto/auth.dto';

@Controller('api/score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get(':gameMode')
  @UseGuards(AdminAuthGuard)
  async getAllByScore(@Param('gameMode') gameMode: string): Promise<Score[]> {
    return await this.scoreService.getAllByScore(gameMode);
  }

  @Post('guest')
  async insertScoreGuest(
    @Body(new ValidationPipe()) input: CreateScoreRequest,
  ): Promise<CreateScoreResponse> {
    return await this.scoreService.insertScore(input);
  }

  @Post('member')
  @UseGuards(MemberAuthGuard)
  async insertScoreMember(
    @Body(new ValidationPipe()) input: CreateScoreRequest,
    @Request() req: { user: PasswordOmitUser },
  ): Promise<CreateScoreResponse> {
    return await this.scoreService.insertScore(input, req.user);
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
