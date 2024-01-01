import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import TodoList, {
  TodoListInsert,
  TodoListUpdate,
} from './entities/todolist.entity';
import { TodolistService } from './todolist.service';

@Controller('todolist')
export class TodolistController {
  constructor(private todoListService: TodolistService) {}

  @Get('/')
  async getList(): Promise<TodoList[]> {
    return this.todoListService.getList();
  }

  @Post('/add')
  async add(@Body() todoData: TodoListInsert) {
    const { subject, startedAt } = todoData;
    return await this.todoListService.add({
      subject,
      startedAt,
    });
  }

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

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    const result = await this.todoListService.delete(id);
    if (result === 0) {
      return false;
    }

    return true;
  }
}
