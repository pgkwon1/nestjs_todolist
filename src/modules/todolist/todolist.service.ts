import { Injectable } from '@nestjs/common';
import TodoList from './entities/todolist.model';
import { InjectModel } from '@nestjs/sequelize';
import { TodoListInsert, TodoListUpdate } from './entities/todolist.entity';
import { Op } from 'sequelize';

@Injectable()
export class TodolistService {
  constructor(@InjectModel(TodoList) private todoList: typeof TodoList) {}

  async getList({
    date,
    userId,
  }: {
    date: string;
    userId: string;
  }): Promise<TodoList[]> {
    return this.todoList.findAll({
      where: {
        startedAt: {
          [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`],
        },
        userId,
      },
      order: [['createdAt', 'DESC']],
    });
  }
  async add(
    { subject, startedAt, category }: TodoListInsert,
    userId: string,
  ): Promise<string | boolean> {
    const { id } = await this.todoList.create({
      subject,
      category,
      startedAt,
      userId,
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
