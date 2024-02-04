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

  @IsString()
  @IsNotEmpty()
  gameMode: string;
}

export class InsertScoreDto extends BaseScoreDto {
  @IsString()
  @IsNotEmpty()
  uuid: string;
}
