import { SignUpDto } from 'src/auth/dto/signup.dto';

export type CreateUserType = SignUpDto & {
  refresh_token: string;
};
