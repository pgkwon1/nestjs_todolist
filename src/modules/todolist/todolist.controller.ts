import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import TodoList, {
  TodoListInsert,
  TodoListUpdate,
} from './entities/todolist.entity';
import { TodolistService } from './todolist.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('todolist')
export class TodolistController {
  constructor(private todoListService: TodolistService) {}

  @Get('/:date')
  async getList(@Param('date') date: string): Promise<TodoList[]> {
    return this.todoListService.getList(date);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/add')
  async add(@Body() todoData: TodoListInsert) {
    const { subject, startedAt, category, userId } = todoData;
    return await this.todoListService.add({
      subject,
      category,
      startedAt,
      userId,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/update/:id')
  async update(@Body() updateData: TodoListUpdate, @Param('id') id: string) {
    const { subject, isFinish, finishedAt } = updateData;
    return this.todoListService.update({
      id,
      subject,
      isFinish,
      finishedAt,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    const result = await this.todoListService.delete(id);
    if (result === 0) {
      return false;
    }

    return true;
  }
}
