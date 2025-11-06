import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const message = 
      typeof exceptionResponse === 'string' 
        ? exceptionResponse
        : (exceptionResponse as any)?.message || 'Internal server error';

    const errorResponse = {
      success: false,
      error: {
        statusCode: status,
        message: Array.isArray(message) ? message : [message],
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
      },
    };

    // Log error for debugging
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error('Server Error:', {
        ...errorResponse.error,
        stack: exception.stack,
      });
    }

    response.status(status).json(errorResponse);
  }
}