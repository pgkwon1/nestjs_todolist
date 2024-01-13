import { HttpException } from '@nestjs/common';

export class MemberException extends HttpException {
  constructor(message: string, code: number, className: string) {
    super(message, code);
    this.name = className;
  }
}

export class ExistsMemberException extends MemberException {
  constructor(message: string, code: number) {
    super(message, code, 'ExistsMemberException');
  }
}

export class FailRegisterException extends MemberException {
  constructor(message: string, code: number) {
    super(message, code, 'FailRegisterException');
  }
}
