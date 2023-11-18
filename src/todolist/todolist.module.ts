import { Module } from '@nestjs/common';
import { TodolistController } from './todolist.controller';
import { TodolistService } from './todolist.service';
import TodoList from './entities/todolist.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [TodolistController],
  providers: [TodolistService, TodoList],
  imports: [SequelizeModule.forFeature([TodoList])],
})
export class TodolistModule {}
