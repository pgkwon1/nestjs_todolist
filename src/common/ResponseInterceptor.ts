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
    const statusCode: number = context.switchToHttp().getResponse().statusCode;
    const message = statusCode >= 500 ? 'error' : 'success';
    return next.handle().pipe(
      map((data) => ({
        statusCode,
        data,
        message,
      })),
    );
  }
}
