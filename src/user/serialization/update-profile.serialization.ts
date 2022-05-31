import { Expose } from 'class-transformer';

export class UpdateProfileSerializationClass {
  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  patronymic: string;

  @Expose()
  question: string;

  @Expose()
  answer: string;
}
