import { IsInt, IsNotEmpty, IsString } from 'class-validator';
export class BaseScoreDto {
  @IsInt()
  userId: string;

  @IsString()
  userName: string;

  @IsInt()
  @IsNotEmpty()
  score: number;

  @IsString()
  @IsNotEmpty()
  uuid: string;
}

export class CreateSampleDto extends BaseScoreDto {}
