import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, ip } = request;
    const userAgent = request.get('User-Agent') || '';
    
    const startTime = Date.now();
    
    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        // Log request details
        console.log(
          `${method} ${url} - ${ip} - ${userAgent} - ${duration}ms`
        );
      }),
    );
  }
}