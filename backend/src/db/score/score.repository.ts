import { DataSource, Repository } from 'typeorm';
import { Score } from './score.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScoreRepository extends Repository<Score> {
  constructor(private dataSource: DataSource) {
    super(Score, dataSource.createEntityManager());
  }

  async findByUuid(uuid: string): Promise<Score> {
    return await this.findOne({
      where: {
        uuid,
      },
      loadRelationIds: true,
    });
  }
}
