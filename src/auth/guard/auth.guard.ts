import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { SignUpInterface } from '../types/signup.interface';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { body }: Request<{}, {}, SignUpInterface> =
      context.switchToHttp().getRequest();

    if (body.password !== body.passwordConfirmation) {
      throw new BadRequestException(
        'Passwords does not match',
      );
    }

    return true;
  }
}
