import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  patronymic: string;

  @IsOptional()
  @IsString()
  question: string;

  @IsOptional()
  @IsString()
  answer: string;
}
