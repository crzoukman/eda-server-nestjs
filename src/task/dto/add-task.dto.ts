import { IsNotEmpty, IsString } from 'class-validator';

export class AddTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  added: Date;

  @IsNotEmpty()
  plannedStart: Date;

  @IsNotEmpty()
  plannedEnd: Date;
}
