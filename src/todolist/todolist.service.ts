import { Injectable } from '@nestjs/common';
import TodoList from './entities/todolist.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TodolistService {
  constructor(@InjectModel(TodoList) private todoList: typeof TodoList) {}

  async add({ subject, startedAt }) {
    await this.todoList.create({
      subject,
      startedAt,
    });
  }
}
