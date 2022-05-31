import { Expose } from 'class-transformer';

export class AuthSerializationClass {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  access_token: string;

  @Expose()
  refresh_token: string;
}
