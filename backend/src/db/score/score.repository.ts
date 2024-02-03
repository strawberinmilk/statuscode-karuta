import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScoreRepository extends Repository<Score> {
  constructor(@InjectRepository(Score) repository: Repository<Score>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findByUuid(uuid: string) {
    return await this.find({
      where: {
        uuid,
      },
    });
  }
}
