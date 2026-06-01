
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // 1. Detectamos qué tipo de error es para nuestro JSON interno
    const internalStatusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR; // Si no lo controlas tú, cae aquí (500)

    const statusText = HttpStatus[internalStatusCode] || 'INTERNAL SERVER ERROR';
    
    let message = 'Error';
    let errorDetails: string[] = [];

    // 2. Extraemos los mensajes del error
    if (exception instanceof HttpException) {
      const resResponse = exception.getResponse();
      if (typeof resResponse === 'string') {
        message = resResponse;
      } else if (typeof resResponse === 'object' && resResponse !== null) {
        const resMessage = (resResponse as any).message;
        message = exception.message || 'Error de petición';
        if (Array.isArray(resMessage)) {
          errorDetails = resMessage;
        } else if (typeof resMessage === 'string') {
          errorDetails = [resMessage];
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }
    
    response.status(200).json({
      statusCode: internalStatusCode, 
      status: statusText,
      message,
      error: errorDetails.length > 0 ? errorDetails : [message],
    });
  }
}
