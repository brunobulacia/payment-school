/*
https://docs.nestjs.com/interceptors#interceptors
*/

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;

    response.status(HttpStatus.OK); // Cambia el código de estado a 200 OK

    return next.handle().pipe( 
      map((data) => ({
        statusCode,
        status: HttpStatus[statusCode] || 'OK',
        // Puedes personalizar el mensaje u obtenerlo si data trae un mensaje específico
        message: data?.message || 'Operación realizada con éxito',
        // Si el controlador devuelve un objeto con propiedad 'data', la usamos; si no, usamos todo el objeto
        data: data?.data !== undefined ? data.data : data,
      })),
    );
  }
}
