import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  Request,
  SetMetadata,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { Serialize } from 'src/common/interceptor/serialize.interceptor';
import { AuthService } from './auth.service';
import { ReqUser } from '../common/decorator/req-user.decorator';
import { SignUpDto } from './dto/signup.dto';
import { AuthGuard } from './guard/auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { SignUpBodyTransformPipe } from './pipe/signup-body-transfrom.pipe';
import { AuthSerializationClass } from './serialization/auth.serialization';
import { ReqUserInterface } from '../common/types/req-user.interface';
import { SignUpReturnType } from './types/signup-return.type';
import { TokensInterface } from './types/tokens.interface';
import { GetQuestionTransformPipe } from './pipe/get-question-transfrom.pipe';
import { GetQuestionDto } from './dto/get-question.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @Serialize(AuthSerializationClass)
  @UsePipes(SignUpBodyTransformPipe)
  @UseGuards(AuthGuard)
  signup(
    @Body() dto: SignUpDto,
  ): Promise<SignUpReturnType> {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async signin(@Request() req: ExpressRequest) {
    const username = req.body.username.toLowerCase();
    const tokens = await this.authService.refreshTokens(
      username,
    );

    return tokens;
  }

  @UseGuards(JwtAuthGuard)
  @SetMetadata('tokenType', 'RT')
  @Get('refresh-tokens')
  refreshTokens(
    @ReqUser() user: ReqUserInterface,
  ): Promise<TokensInterface> {
    return this.authService.refreshTokens(
      user.username,
      user.refresh_token,
    );
  }

  @UseGuards(JwtAuthGuard)
  @SetMetadata('tokenType', 'AT')
  @Get('check-user')
  checkUser(@ReqUser() user: ReqUserInterface) {
    return user;
  }

  @UsePipes(GetQuestionTransformPipe)
  @Get('get-question')
  getQuestion(@Query() dto: GetQuestionDto) {
    return this.authService.getQuestion(
      dto.username,
      dto.email,
    );
  }

  @Post('restore-password')
  restorePassword(@Body() dto: RestorePasswordDto) {
    return this.authService.restorePassword(dto);
  }
}
