import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/db/user/user.repository';
import {
  AuthSignUpRequest,
  PasswordOmitUser,
  UserRemovePassword,
} from './dto/auth.dto';
import { userActive, userRoleId } from 'src/db/user/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtPayload, JwtToken } from './dto/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async validateMember(
    email: string,
    pass: string,
  ): Promise<UserRemovePassword | null> {
    const user = await this.userRepository.findOneBy({ email });

    // TODO: ハッシュ化
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

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
      password: input.password, // TODO: ハッシュ化
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

  async login(input: PasswordOmitUser): Promise<JwtToken> {
    const payload: JwtPayload = { sub: input.id, email: input.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  /*
  async createNewUser() {
    return true;
  }

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
