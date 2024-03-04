import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/db/user/user.repository';
import { AuthSignUpRequest, PasswordOmitUser } from './dto/auth.dto';
import { userActive, userRoleId } from 'src/db/user/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtPayload, JwtToken } from './dto/auth.type';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  /**
   * アカウント新規作成
   * @param input AuthSignUpRequest
   * @returns トークン
   */
  async signUp(input: AuthSignUpRequest): Promise<string> {
    const tmpToken = uuidv4();
    const user = await this.userRepository.save({
      email: input.email,
      tmpEmail: input.email,
      password: bcrypt.hashSync(input.password, 10),
      tmpToken,
      name: input.name,
      active: userActive.TEMPORARY,
      role: userRoleId.MEMBER,
    });
    if (!user)
      throw new UnauthorizedException(
        'メールアドレスまたは名前を他の方が使用されています',
      );
    return tmpToken;
  }

  async login(user: PasswordOmitUser): Promise<JwtToken> {
    if ((user.role = userRoleId.GUEST)) return null;
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  /*
  async activeUser() {
    return true;
  }


  async changeEmail() {
    return true;
  }

  async changePassword() {
    return true;
  }

  async whoAmI() {
    return true;
  }
  */
}
