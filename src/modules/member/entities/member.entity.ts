import { PickType } from '@nestjs/mapped-types';
import { IsDateString, IsString } from 'class-validator';
import { CreatedAt, UpdatedAt } from 'sequelize-typescript';

export class IMemberDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly nickname: string;

  @IsString()
  readonly salt: string;

  @IsDateString()
  readonly registerAt: Date;

  @IsDateString()
  readonly currentLogin: Date;

  @CreatedAt
  readonly createdAt: Date;

  @UpdatedAt
  readonly updatedAt: Date;
}

export class IRegisterRequestDto extends PickType(IMemberDto, [
  'userId',
  'password',
  'nickname',
]) {}
