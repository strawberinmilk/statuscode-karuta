import { User } from 'src/db/user/user.entity';

/* export type Message = {
  message: string;
}; */

export type JwtToken = {
  access_token: string;
};

export type JwtPayload = {
  sub: User['id'];
  email: User['email'];
};
