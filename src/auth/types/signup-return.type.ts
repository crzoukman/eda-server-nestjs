import { UserEntity } from 'src/user/user.entity';

export type SignUpReturnType = UserEntity & {
  access_token: string;
};
