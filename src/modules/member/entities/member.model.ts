import {
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  modelName: 'members',
})
@Table
export default class MemberModel extends Model<MemberModel> {
  @PrimaryKey
  @Column
  readonly id: string;

  @Column
  readonly userId: string;

  @Column
  readonly password: string;

  @Column
  readonly salt: string;

  @Column
  readonly registerAt: Date;

  @Column
  readonly currentLogin: Date;

  @CreatedAt
  readonly createdAt: Date;

  @UpdatedAt
  readonly updatedAt: Date;
}
