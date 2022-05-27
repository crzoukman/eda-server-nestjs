import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserType } from './types/create-user.type';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(
    data: CreateUserType,
  ): Promise<UserEntity> {
    const { email, username, password, refresh_token } =
      data;
    const user = this.create({
      email,
      username,
      password,
      refresh_token,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (
        error.code === 'SQLITE_CONSTRAINT' ||
        error.code === '23505'
      ) {
        throw new ConflictException(
          'Email or username already exists',
        );
      }

      throw new InternalServerErrorException(error.code);
    }

    return user;
  }

  async updateProfile(data: UserEntity) {
    try {
      const res = await this.save(data);

      return res;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
