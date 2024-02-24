export enum userRoleId {
  ADMIN = 0,
  GUEST = 1,
  MEMBER = 2,
}

export enum userActive {
  TEMPORARY = -1,
  DELETED = 0,
  ACTIVE = 1,
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

/* 
export class BaseUserDto {
  email: string;
  password: string;
}

export class CreateUserDto {
  tmpEmail: string;
  name: string;
  active: number;
  role: number;
}
*/
