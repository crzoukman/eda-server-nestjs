import { IsEmail, IsString } from 'class-validator';

export class GetQuestionDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;
}
