import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { AddTaskDto } from './dto/add-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
    private userService: UserService,
  ) {}

  async addTask(dto: AddTaskDto, username: string) {
    const user = await this.userService.findUserByUsername(
      username,
    );

    return this.taskRepository.createTask(dto, user);
  }

  async getTasks(username: string) {
    const user = await this.userService.findUserByUsername(
      username,
    );

    const tasks = await this.taskRepository.findTasks(user);

    return tasks;
  }

  async editTask(dto: EditTaskDto) {
    const task = await this.taskRepository.findTaskById(
      dto.id,
    );

    if (!task) {
      throw new NotFoundException(
        'Something wrong! Could not find the task by id',
      );
    }

    const updated = {
      ...task,
      ...dto,
    };

    this.taskRepository.save(updated);

    return updated;
  }

  async deleteTask(id: string) {
    try {
      const res = await this.taskRepository.delete(id);

      if (res.affected === 0) {
        throw new NotFoundException(
          'Could not find the task by id to delete it',
        );
      }

      return res;
    } catch (e) {
      throw new InternalServerErrorException(
        'Could not delete the task by id',
      );
    }
  }
}
