import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRemovePassword } from './user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmailAndPassSafePass(
    email: string,
    rawPassword: string,
  ): Promise<UserRemovePassword> {
    const user = await this.findOne({
      where: {
        email,
      },
    });
    if (!user) return null;
    if (!bcrypt.compareSync(rawPassword, user.password)) return null;
    delete user.password;
    return user;
  }

  async findByEmailSafePass(email: string): Promise<UserRemovePassword> {
    const user = await this.findOne({
      where: {
        email,
      },
    });
    if (!user) return null;
    delete user.password;
    return user;
  }
}
