import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const Jwt = createParamDecorator(
  async (data, context: ExecutionContext) => {
    const { headers } = context.switchToHttp().getRequest();
    const tokens = headers.authorization.split(' ')[1];
    const decodeTokens = await decodeJwt(tokens);
    if (typeof decodeTokens === 'object') {
      return decodeTokens.userId;
    }

    throw new BadRequestException('invalid token');
  },
);
function decodeJwt(tokens: string): Promise<string | jwt.JwtPayload> {
  return new Promise((resolve) => {
    jwt.verify(tokens, process.env.JWT_SECRET_KEY, (err, decode) => {
      resolve(decode);
    });
  });
}
