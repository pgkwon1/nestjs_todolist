import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MemberService } from '../member/member.service';
import MemberModel from '../member/entities/member.model';
import { SequelizeModule } from '@nestjs/sequelize';
import JwtStrategy from './jwt.strategy';

@Module({
  imports: [SequelizeModule.forFeature([MemberModel])],
  providers: [AuthService, MemberService, JwtStrategy],
})
export class AuthModule {}
