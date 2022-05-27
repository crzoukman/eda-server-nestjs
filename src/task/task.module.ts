import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    UserModule,
  ],
  controllers: [TaskController],
  providers: [TaskService, JwtService],
})
export class TaskModule {}
