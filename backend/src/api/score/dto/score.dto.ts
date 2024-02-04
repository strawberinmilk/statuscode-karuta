import { IsNotEmpty, IsString } from 'class-validator';
import { BaseScoreDto } from 'src/db/score/score.dto';

export class CreateScoreRequest extends BaseScoreDto {}

export class CreateScoreResponse {
  allCount: number;
  rank: number;
  uuid: string;
}

export class GetScoreRequest {
  @IsString()
  @IsNotEmpty()
  gameMode: string;
}

export class UpdateScoreNameRequest {
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  userName: string;
}
