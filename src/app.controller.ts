import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('')
export class AppController {
  @Get('/check')
  @UseGuards(AuthGuard('jwt'))
  check() {}
}
