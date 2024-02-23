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

export class UserRemovePassword {
  id: number;
  email: string;
  tmpEmail: string;
  tmpToken: string;
  name: string;
  active: number;
  role: number;
}

export class AuthLoginRequest extends AuthBaseDto {}

export type PasswordOmitUser = Omit<User, 'hashedPassword'>;
