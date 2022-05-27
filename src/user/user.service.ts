import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { UserEntity } from './user.entity';
import { CreateUserType } from './types/create-user.type';
import { UserRepository } from './user.repository';
import { ReqUserInterface } from 'src/common/types/req-user.interface';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async save(user: UserEntity) {
    await this.userRepository.save(user);
  }

  create(data: CreateUserType): Promise<UserEntity> {
    return this.userRepository.createUser(data);
  }

  async findUserByUsername(
    username: string,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      username,
    });

    if (!user) {
      throw new NotFoundException(
        'User has not been found',
      );
    }

    return user;
  }

  async updateRefreshToken(
    username: string,
    token: string,
  ): Promise<UserEntity> {
    const user = await this.findUserByUsername(username);

    user.refresh_token = token;

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'Got error while updating refresh token',
      );
    }

    return user;
  }

  async updateProfile(
    dto: UpdateProfileDto,
    user: ReqUserInterface,
  ) {
    const userEntity = await this.findUserByUsername(
      user.username,
    );
    const data = {
      ...userEntity,
      ...dto,
    };

    return this.userRepository.updateProfile(data);
  }

  async getProfileData(username: string) {
    return await this.findUserByUsername(username);
  }
}
