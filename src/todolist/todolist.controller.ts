import { Body, Controller, Post } from '@nestjs/common';
import TodoList from './entities/todolist.entity';
import { TodolistService } from './todolist.service';

@Controller('todolist')
export class TodolistController {
  constructor(private todoListService: TodolistService) {}
  @Post('/add')
  async add(@Body() todoData: TodoList) {
    const { subject, startedAt } = todoData;
    return this.todoListService.add({
      subject,
      startedAt,
    });
  }
}
