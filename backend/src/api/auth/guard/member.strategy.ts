import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userRoleId } from 'src/db/user/user.dto';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserRemovePassword } from '../dto/auth.dto';

@Injectable()
export class MemberStrategy extends PassportStrategy(Strategy, 'member') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    username: string,
    password: string,
  ): Promise<UserRemovePassword> {
    const user = await this.authService.validateMember(username, password);
    if (!user || user.role !== userRoleId.MEMBER) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
