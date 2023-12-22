import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    const message =
      statusCode === 200
        ? '성공적으로 데이터를 불러왔습니다.'
        : '오류가 발생하였습니다.';
    return next.handle().pipe(
      map((data) => ({
        statusCode,
        data,
        message,
      })),
    );
  }
}
