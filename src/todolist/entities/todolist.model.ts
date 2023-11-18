import { UUIDV4 } from 'sequelize';
import {
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  modelName: 'TodoList',
})
@Table
export default class TodoList extends Model<TodoList> {
  @PrimaryKey
  @Column({
    defaultValue: UUIDV4(),
  })
  readonly id: string;

  @Column
  readonly subject: string;

  @Column({
    defaultValue: false,
  })
  readonly isFinish: boolean;

  @Column
  readonly startedAt: Date;

  @Column
  readonly finishedAt: Date;

  @CreatedAt
  readonly createdAt: Date;
}
