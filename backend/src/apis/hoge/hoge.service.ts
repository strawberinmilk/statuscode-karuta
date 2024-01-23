import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sample } from 'src/db/sample/sample.entity';
import { CreateSampleDto } from 'src/db/sample/sample.dto';

@Injectable()
export class HogeService {
  constructor(
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample>,
  ) {}

  async get() {
    return 'get api/hoge';
  }
  async post(input: CreateSampleDto) {
    const lastAccess = await this.sampleRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 1,
    });
    await this.sampleRepository.insert(input);
    return `last access: ${lastAccess[0].createdAt.toJSON()}`;
  }
}
