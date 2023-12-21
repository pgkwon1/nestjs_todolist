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
    return this.todoListService.add({
      subject,
      startedAt,
    });
  }

  @Patch('/update/:id')
  async update(@Body() updateData: TodoListUpdate, @Param('id') id: string) {
    const { subject, isFinish } = updateData;
    return this.todoListService.update({
      id,
      subject,
      isFinish,
    });
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<number> {
    return this.todoListService.delete(id);
  }
}
