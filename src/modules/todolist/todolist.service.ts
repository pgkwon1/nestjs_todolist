import { Injectable } from '@nestjs/common';
import TodoList from './entities/todolist.model';
import { InjectModel } from '@nestjs/sequelize';
import { TodoListInsert, TodoListUpdate } from './entities/todolist.entity';

@Injectable()
export class TodolistService {
  constructor(@InjectModel(TodoList) private todoList: typeof TodoList) {}

  async getList(): Promise<TodoList[]> {
    return this.todoList.findAll({
      order: [['createdAt', 'DESC']],
    });
  }
  async add({
    subject,
    startedAt,
    category,
  }: TodoListInsert): Promise<string | boolean> {
    const { id } = await this.todoList.create({
      subject,
      category,
      startedAt,
    });

    if (typeof id !== 'string') {
      return false;
    }
    return id;
  }

  async update({
    id,
    subject,
    isFinish,
    finishedAt,
  }: TodoListUpdate): Promise<boolean> {
    const [result] = await this.todoList.update(
      {
        subject,
        isFinish,
        finishedAt,
      },
      {
        where: {
          id,
        },
      },
    );

    if (result === 0) {
      return false;
    }
    return true;
  }

  async delete(id: string): Promise<number> {
    return await this.todoList.destroy({
      where: {
        id,
      },
    });
  }
}
