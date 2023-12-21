import { Module } from '@nestjs/common';
import { TodolistController } from './todolist.controller';
import { TodolistService } from './todolist.service';
import TodoListModel from './entities/todolist.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([TodoListModel])],
  controllers: [TodolistController],
  providers: [TodolistService, TodoListModel],
})
export class TodolistModule {}
