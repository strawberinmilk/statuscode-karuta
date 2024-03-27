import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
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

export class GetScoreLogRequest {
  @IsString()
  @IsNotEmpty()
  gameMode: string;

  @IsDateString()
  @IsNotEmpty()
  from: Date;

  @IsDateString()
  @IsNotEmpty()
  to: Date;

  @IsString()
  @IsNotEmpty()
  order: string;
}

export class GetRankingRequest {
  @IsString()
  @IsNotEmpty()
  gameMode: string;
}
