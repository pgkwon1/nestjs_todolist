import { Body, Controller, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { IRegisterRequestDto } from './entities/member.entity';
import {
  ExistsMemberException,
  FailRegisterException,
} from '../../exceptions/MemberException';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('/login')
  async login(@Body() loginData) {
    const result = await this.memberService.getUser(loginData);
    if (result) {
      return result;
    }

    return false;
  }
  @Post('/register')
  async register(@Body() registerData: IRegisterRequestDto) {
    const isUser = await this.memberService.isUser(registerData.userId);

    if (isUser) {
      throw new ExistsMemberException('이미 존재하는 회원입니다.', 200);
    }

    const result = await this.memberService.register(registerData);
    if (!result) {
      throw new FailRegisterException('회원가입에 실패하였습니다.', 200);
    }

    return true;
  }
}
