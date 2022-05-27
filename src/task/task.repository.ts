import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddTaskDto } from './dto/add-task.dto';
import { TaskEntity } from './task.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async createTask(dto: AddTaskDto, user: UserEntity) {
    const task = this.create({
      ...dto,
      user,
    });

    try {
      await this.save(task);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }

    delete task.user;

    return task;
  }

  async findTasks(user: UserEntity) {
    const query = this.createQueryBuilder('tasks');
    query.where({ user });
    const tasks = await query.getMany();
    return tasks;
  }

  async findTaskById(id: string) {
    const task = this.findOne({ id });
    return task;
  }
}
