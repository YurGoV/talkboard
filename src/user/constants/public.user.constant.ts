import { User } from 'src/entities/User.entity';
import { FindOptionsSelect } from 'typeorm';

export const USER_SELECT_PUBLIC_FIELDS: FindOptionsSelect<User> = {
  userName: true,
  email: true,
  homePage: true,
  avatarUrl: true,
  createdAt: true,
};
export const USER_SELECT_AUTH_FIELDS: FindOptionsSelect<User> = {
  ...USER_SELECT_PUBLIC_FIELDS,
  token: true,
};
