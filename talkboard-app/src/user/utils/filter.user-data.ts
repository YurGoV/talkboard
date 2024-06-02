import { User } from 'src/entities/User.entity';
import { USER_SELECT_AUTH_FIELDS } from '../constants/public.user.constant';

export const filterPrivateUserData = (userData: User): Partial<User> => {
  const filteredUserData: Partial<User> = {};
  Object.keys(USER_SELECT_AUTH_FIELDS).forEach((field) => {
    filteredUserData[field] = userData[field];
  });

  return filteredUserData;
};
