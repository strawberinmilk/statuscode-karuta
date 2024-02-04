import { BadRequestException, Injectable } from '@nestjs/common';
import { InsertScoreDto } from 'src/db/score/score.dto';
import {
  CreateScoreRequest,
  UpdateScoreNameRequest,
} from 'src/api/score/dto/score.dto';
import { ScoreRepository } from 'src/db/score/score.repository';
import * as crypto from 'crypto';
import { Between, MoreThan } from 'typeorm';

@Injectable()
export class ScoreService {
  constructor(private readonly scoreRepository: ScoreRepository) {}
  // @InjectRepository(Score)

  async getAllByScore(gameMode: string) {
    return await this.scoreRepository.find({
      where: {
        gameMode,
      },
    });
  }

  async insertScore(input: CreateScoreRequest) {
    const insertData = new InsertScoreDto();
    const uuid = crypto.randomUUID();
    insertData.userId = input.userId;
    insertData.userName = input.userName;
    insertData.score = input.score;
    insertData.gameMode = input.gameMode;
    insertData.uuid = uuid;
    await this.scoreRepository.insert(insertData);

    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    const end = new Date();
    const allCount = await this.scoreRepository.count({
      where: {
        gameMode: input.gameMode,
        createdAt: Between(start, end),
      },
    });
    const rank =
      1 +
      (await this.scoreRepository.count({
        where: {
          score: MoreThan(input.score),
          gameMode: input.gameMode,
          createdAt: Between(start, end),
        },
      }));
    return {
      allCount,
      rank,
      uuid,
    };
  }

  async setName(input: UpdateScoreNameRequest) {
    const targetScore = await this.scoreRepository.findByUuid(input.uuid);
    if (!targetScore || targetScore.userId) {
      throw new BadRequestException('このスコアは編集できません');
    }
    targetScore.userId = -1;
    targetScore.userName = input.userName;
    await this.scoreRepository.save(targetScore);
  }

  // デバッグ用
  // async delete(id: number) {
  //   return await this.scoreRepository.delete(id);
  // }
}
