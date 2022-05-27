import {
  Body,
  Controller,
  Get,
  Patch,
  SetMetadata,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ReqUser } from 'src/common/decorator/req-user.decorator';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { Serialize } from 'src/common/interceptor/serialize.interceptor';
import { ReqUserInterface } from 'src/common/types/req-user.interface';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateProfileSerializationClass } from './serialization/update-profile.serialization';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @SetMetadata('tokenType', 'AT')
  @Serialize(UpdateProfileSerializationClass)
  @Patch()
  updateProfile(
    @Body() dto: UpdateProfileDto,
    @ReqUser() user: ReqUserInterface,
  ) {
    return this.userService.updateProfile(dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @SetMetadata('tokenType', 'AT')
  @Serialize(UpdateProfileSerializationClass)
  @Get()
  getProfileData(@ReqUser() user: ReqUserInterface) {
    return this.userService.getProfileData(user.username);
  }
}
