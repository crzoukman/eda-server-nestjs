import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const tokenType = this.reflector.get<string>(
      'tokenType',
      context.getHandler(),
    );

    const header = req.headers.authorization;

    if (!header) {
      throw new UnauthorizedException();
    }

    const bearer = header.split(' ')[0];
    const token = header.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }

    try {
      const user = this.jwtService.verify(token, {
        secret: this.configService.get(
          'JWT_SECRET_' + tokenType,
        ),
      });

      if (tokenType === 'RT') {
        req.user = {
          ...user,
          refresh_token: token,
        };
      }

      if (tokenType === 'AT') {
        req.user = user;
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
