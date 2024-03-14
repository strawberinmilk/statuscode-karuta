import { Injectable } from '@nestjs/common';
import { GUEST_USER } from 'src/constants/constatns';
import { UserActive, UserRoleId } from 'src/db/user/user.dto';
import { User } from 'src/db/user/user.entity';
import { UserRepository } from 'src/db/user/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class InitService {
  constructor(private readonly userRepository: UserRepository) {}
  async onModuleInit() {
    // 初回adminを作成
    const adminUser = await this.userRepository.findBy({
      role: UserRoleId.ADMIN,
    });
    if (!adminUser.length) {
      await this.userRepository.save({
        email: 'initAdmin',
        password: bcrypt.hashSync('initAdmin', 10), // TODO: 環境変数
        name: 'init admin',
        active: UserActive.ACTIVE,
        role: UserRoleId.ADMIN,
      });
    }
    // 初回guestを作成
    const guestUserExist = await this.userRepository.findBy({
      role: UserRoleId.GUEST,
    });
    if (!guestUserExist.length) {
      const guestUser = GUEST_USER;
      guestUser.password = bcrypt.hashSync(guestUser.password, 10);
      const createGuestUser = await this.userRepository.save(guestUser);
      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ id: -1 })
        .where('id = :id', { id: createGuestUser.id })
        .execute();
    }
  }
}
