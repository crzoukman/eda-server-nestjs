import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<any> {
    if (typeof username !== 'string') {
      throw new BadRequestException(
        'Username must be a string',
      );
    }

    if (typeof password !== 'string') {
      throw new BadRequestException(
        'Password must be a string',
      );
    }

    const user = await this.authService.validate(
      username.toLowerCase(),
      password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
