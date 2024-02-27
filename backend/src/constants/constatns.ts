import { userActive, userRoleId } from 'src/db/user/user.dto';
import { User } from 'src/db/user/user.entity';

export const GUEST_USER: User = {
  id: -1,
  email: 'dummy',
  password: 'dummy', // TODO: 環境変数
  name: 'GUEST',
  tmpEmail: null,
  tmpToken: null,
  active: userActive.ACTIVE,
  role: userRoleId.GUEST,
};
