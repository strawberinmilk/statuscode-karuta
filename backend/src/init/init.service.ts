import { Injectable } from '@nestjs/common';
import { GUEST_USER } from 'src/constants/constatns';
import { userActive, userRoleId } from 'src/db/user/user.dto';
import { User } from 'src/db/user/user.entity';
import { UserRepository } from 'src/db/user/user.repository';

@Injectable()
export class InitService {
  constructor(private readonly userRepository: UserRepository) {}
  async onModuleInit() {
    // 初回adminを作成
    const adminUser = await this.userRepository.findBy({
      role: userRoleId.ADMIN,
    });
    if (!adminUser.length) {
      await this.userRepository.save({
        email: 'hoge',
        password: 'hoge',
        name: 'init admin',
        active: userActive.ACTIVE,
        role: userRoleId.ADMIN,
      });
    }
    // 初回guestを作成
    const guestUserExist = await this.userRepository.findBy({
      role: userRoleId.GUEST,
    });
    if (!guestUserExist.length) {
      const createGuestUser = await this.userRepository.save(GUEST_USER);
      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ id: -1 })
        .where('id = :id', { id: createGuestUser.id })
        .execute();
    }
  }
}
