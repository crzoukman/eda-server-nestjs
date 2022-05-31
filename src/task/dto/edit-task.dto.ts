import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditTaskDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  added?: Date;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  plannedStart?: Date;

  @IsOptional()
  plannedEnd?: Date;

  @IsOptional()
  @IsBoolean()
  started: boolean;

  @IsOptional()
  @IsBoolean()
  completed: boolean;

  @IsOptional()
  startedTime?: Date;

  @IsOptional()
  endedTime?: Date;
}
