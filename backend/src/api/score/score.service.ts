import { BadRequestException, Injectable } from '@nestjs/common';
import { InsertScoreDto } from 'src/db/score/score.dto';
import {
  CreateScoreRequest,
  GetRankingRequest,
  GetScoreLogRequest,
  UpdateScoreNameRequest,
} from 'src/api/score/dto/score.dto';
import { ScoreRepository } from 'src/db/score/score.repository';
import * as crypto from 'crypto';
import { Between, MoreThan } from 'typeorm';
import { PasswordOmitUser } from '../auth/dto/auth.dto';

@Injectable()
export class ScoreService {
  constructor(private readonly scoreRepository: ScoreRepository) {}
  // @InjectRepository(Score)

  async getAllByScore(gameMode: string) {
    return await this.scoreRepository.find({
      where: {
        gameMode,
      },
      loadRelationIds: true,
    });
  }

  async insertScore(input: CreateScoreRequest, user?: PasswordOmitUser) {
    const insertData = new InsertScoreDto();
    const uuid = crypto.randomUUID();
    insertData.user = user ? user : null;
    insertData.userName = user ? user.name : input.userName;
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
    if (!targetScore || targetScore.user.id !== -1) {
      throw new BadRequestException('このスコアは編集できません');
    }
    targetScore.userName = input.userName;
    await this.scoreRepository.save(targetScore);
  }

  async getLog(input: GetScoreLogRequest, user: PasswordOmitUser) {
    const order: Record<string, 'ASC' | 'DESC'> = (() => {
      switch (input.order) {
        case 'scoreASC':
          return { score: 'ASC' };
        case 'scoreDESE':
          return { score: 'DESC' };
        case 'dateASC':
          return { createdAt: 'ASC' };
        case 'dateDESE':
          return { createdAt: 'DESC' };
      }
      return {};
    })();
    const result = await this.scoreRepository.find({
      where: {
        user: { id: user.id },
        gameMode: input.gameMode,
        createdAt: Between(input.from, input.to),
      },
      order: { ...order },
      // relations: {
      //   user: true,
      // },
    });
    return result;
  }

  async ranking(input: GetRankingRequest) {
    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    const end = new Date();
    const allCount = await this.scoreRepository.find({
      where: {
        gameMode: input.gameMode,
        createdAt: Between(start, end),
      },
      order: { score: 'DESC' },
      take: 10,
    });
    return allCount;
  }

  // デバッグ用
  // async delete(id: number) {
  //   return await this.scoreRepository.delete(id);
  // }
}
