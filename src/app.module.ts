import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodolistModule } from './modules/todolist/todolist.module';
import { SequelizeModule } from '@nestjs/sequelize';
import TodoList from './modules/todolist/entities/todolist.model';

@Module({
  imports: [
    MoviesModule,
    TodolistModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Hosi3731!',
      database: 'todolist',
      models: [TodoList],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
