import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
export class BaseScoreDto {
  @IsInt()
  @ValidateIf((o, value) => value != null)
  userId?: number;

  @IsString()
  @ValidateIf((o, value) => value != null)
  userName?: string;

  @IsInt()
  @IsNotEmpty()
  score: number;
}

export class CreateScoreRequest extends BaseScoreDto {}
export class CreateScoreInsert extends BaseScoreDto {
  @IsString()
  @IsNotEmpty()
  uuid: string;
}

export class CreateScoreResponse {
  allCount: number;
  rank: number;
  uuid: string;
}
