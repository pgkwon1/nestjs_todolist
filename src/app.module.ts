import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodolistModule } from './modules/todolist/todolist.module';
import { SequelizeModule } from '@nestjs/sequelize';
import TodoList from './modules/todolist/entities/todolist.model';
import { MemberModule } from './modules/member/member.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './modules/auth/auth.module';
import MemberModel from './modules/member/entities/member.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_TIME },
    }),
    PassportModule,
    MoviesModule,
    TodolistModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Hosi3731!',
      database: 'todolist',
      models: [TodoList, MemberModel],
    }),
    MemberModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
