import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserRemovePassword } from 'src/db/user/user.dto';
import { UserRepository } from 'src/db/user/user.repository';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'adminAndUser') {
  constructor(private readonly userRepository: UserRepository) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserRemovePassword> {
    const user = await this.userRepository.findByEmailAndPassSafePass(
      email,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
