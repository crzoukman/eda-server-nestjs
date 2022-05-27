import { SignUpDto } from '../dto/signup.dto';

export interface SignUpInterface extends SignUpDto {
  passwordConfirmation: string;
}
