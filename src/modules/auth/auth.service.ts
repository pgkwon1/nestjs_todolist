import { Injectable } from '@nestjs/common';
import { MemberService } from '../member/member.service';

@Injectable()
export class AuthService {
  constructor(private readonly memberService: MemberService) {}
  async validateUser(data): Promise<boolean> {
    console.log('data', data);
    const result = await this.memberService.isUser(data.userId);
    return result;
  }
}
