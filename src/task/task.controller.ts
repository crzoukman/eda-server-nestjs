import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ReqUser } from 'src/common/decorator/req-user.decorator';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { ReqUserInterface } from 'src/common/types/req-user.interface';
import { AddTaskDto } from './dto/add-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @SetMetadata('tokenType', 'AT')
  @Post()
  addTask(
    @Body() dto: AddTaskDto,
    @ReqUser() user: ReqUserInterface,
  ) {
    return this.taskService.addTask(dto, user.username);
  }

  @UseGuards(JwtAuthGuard)
  @SetMetadata('tokenType', 'AT')
  @Get()
  getTasks(@ReqUser() user: ReqUserInterface) {
    return this.taskService.getTasks(user.username);
  }

  @UseGuards(JwtAuthGuard)
  @SetMetadata('tokenType', 'AT')
  @Put()
  editTask(@Body() dto: EditTaskDto) {
    return this.taskService.editTask(dto);
  }

  @UseGuards(JwtAuthGuard)
  @SetMetadata('tokenType', 'AT')
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
