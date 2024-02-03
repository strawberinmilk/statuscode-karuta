import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScoreRequest, CreateScoreInsert } from 'src/db/score/score.dto';
import { Score } from 'src/db/score/score.entity';
import { ScoreRepository } from 'src/db/score/score.repository';
import * as crypto from 'crypto';
import { Between, LessThan, MoreThan } from 'typeorm';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: ScoreRepository,
  ) {}

  async get() {
    return await this.scoreRepository.find();
  }

  async insertScore(input: CreateScoreRequest) {
    const insertData = new CreateScoreInsert();
    const uuid = crypto.randomUUID();
    insertData.userId = input.userId;
    insertData.userName = input.userName;
    insertData.score = input.score;
    insertData.uuid = uuid;
    await this.scoreRepository.insert(insertData);

    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    const end = new Date();
    const allCount = await this.scoreRepository.count({
      where: {
        createdAt: Between(start, end),
      },
    });
    const rank =
      1 +
      (await this.scoreRepository.count({
        where: {
          score: MoreThan(input.score),
          createdAt: Between(start, end),
        },
      }));
    return {
      allCount,
      rank,
      uuid,
    };
  }
}
