import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { User } from '../user/user.entity';
export class BaseScoreDto {
  @ValidateIf((o, value) => value != null)
  user?: User;

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
