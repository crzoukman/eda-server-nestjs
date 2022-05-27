import { IsEmail, IsString } from 'class-validator';

export class RestorePasswordDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  answer: string;

  @IsString()
  password: string;
}
