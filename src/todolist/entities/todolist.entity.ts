import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDateString, IsString } from 'class-validator';

export default class TodoList {
  @IsString()
  readonly id: string;

  @IsString()
  readonly subject: string;

  @IsBoolean()
  readonly isFinish: boolean;

  @IsDateString()
  readonly startedAt?: Date;

  @IsDateString()
  readonly finishedAt?: Date;
}
export class TodoListInsert extends OmitType(TodoList, [
  'id',
  'isFinish',
  'finishedAt',
]) {}

export class TodoListUpdate extends PartialType(TodoList) {}
