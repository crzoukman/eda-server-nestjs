import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokensInterface } from './types/tokens.interface';
import { SignUpReturnType } from './types/signup-return.type';
import { config } from 'src/config';
import { RestorePasswordDto } from './dto/restore-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(dto: SignUpDto): Promise<SignUpReturnType> {
    const { email, username, password } = dto;
    const hashedPassword = await this.hashPassword(
      password,
    );

    const tokens = await this.generateTokens(
      email,
      username,
    );

    const user = await this.userService.create({
      email,
      username,
      password: hashedPassword,
      refresh_token: tokens.refresh_token,
    });

    return {
      ...user,
      access_token: tokens.access_token,
    };
  }

  private async hashPassword(
    password: string,
  ): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async validate(username: string, password: string) {
    const user = await this.userService.findUserByUsername(
      username,
    );

    if (!user) return null;

    const isValid = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isValid) return null;

    return user;
  }

  private async generateTokens(
    email: string,
    username: string,
  ): Promise<TokensInterface> {
    const payload = {
      email,
      username,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_AT'),
        expiresIn: config.AT_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_RT'),
        expiresIn: config.RT_EXPIRES_IN,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async refreshTokens(
    username: string,
    token?: string,
  ): Promise<TokensInterface> {
    const user = await this.userService.findUserByUsername(
      username,
    );

    if (!user) {
      throw new NotFoundException(
        'User has not been found',
      );
    }

    if (token && token !== user.refresh_token) {
      throw new UnauthorizedException(
        'Refresh token is not valid',
      );
    }

    const tokens = await this.generateTokens(
      user.email,
      user.username,
    );

    await this.userService.updateRefreshToken(
      username,
      tokens.refresh_token,
    );

    return tokens;
  }

  async getQuestion(
    username: string,
    email: string,
  ): Promise<string> {
    const user = await this.userService.findUserByUsername(
      username,
    );

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    if (email !== user.email) {
      throw new ForbiddenException(
        'Username and email must belong the same user',
      );
    }

    if (!user.question.trim() || !user.answer.trim()) {
      throw new HttpException(
        'Question or answer missing',
        HttpStatus.GONE,
      );
    }

    return user.question;
  }

  async restorePassword(dto: RestorePasswordDto) {
    const { username, email, answer, password } = dto;

    const user = await this.userService.findUserByUsername(
      username.toLowerCase(),
    );

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    if (email !== user.email) {
      throw new ForbiddenException(
        'Username and email must belong the same user',
      );
    }

    if (
      answer.toLowerCase() !== user.answer.toLowerCase()
    ) {
      throw new ForbiddenException('Answers do not match');
    }

    const hashed = await this.hashPassword(password);

    const updatedUser = await this.userService.save({
      ...user,
      password: hashed,
    });

    return updatedUser;
  }
}
