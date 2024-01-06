import { Body, Controller, Post } from '@nestjs/common';
import { MemberService } from './member.service';

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
}
