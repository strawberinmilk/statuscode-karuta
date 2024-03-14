import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/db/user/user.entity';

class AuthBaseDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
export class AuthSignUpRequest extends AuthBaseDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class AuthLoginRequest extends AuthBaseDto {}

export class ActiveRequest {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export type PasswordOmitUser = Omit<User, 'hashedPassword'>;
