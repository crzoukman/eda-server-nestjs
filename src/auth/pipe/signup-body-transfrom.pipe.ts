import {
  ArgumentMetadata,
  PipeTransform,
} from '@nestjs/common';
import { SignUpDto } from '../dto/signup.dto';

export class SignUpBodyTransformPipe
  implements PipeTransform
{
  transform(value: SignUpDto, metadata: ArgumentMetadata) {
    return {
      email: value.email.toLowerCase(),
      username: value.username.toLowerCase(),
      password: value.password,
    };
  }
}
