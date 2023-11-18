import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export default class TodoList {
  @IsString()
  readonly subject: string;

  @IsBoolean()
  readonly isFinish: boolean;

  @IsDate()
  readonly startedAt: Date;

  @IsDate()
  readonly finishedAt?: Date;
}
