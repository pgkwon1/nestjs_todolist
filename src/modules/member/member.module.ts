import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import MemberModel from './entities/member.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([MemberModel])],
  controllers: [MemberController],
  providers: [MemberService, MemberModel],
})
export class MemberModule {}
