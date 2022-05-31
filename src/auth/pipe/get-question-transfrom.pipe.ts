import {
  ArgumentMetadata,
  PipeTransform,
} from '@nestjs/common';
import { GetQuestionDto } from '../dto/get-question.dto';

export class GetQuestionTransformPipe
  implements PipeTransform
{
  transform(
    value: GetQuestionDto,
    metadata: ArgumentMetadata,
  ) {
    return {
      username: value.username.toLowerCase(),
      email: value.email.toLocaleLowerCase(),
    };
  }
}
