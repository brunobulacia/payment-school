/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@core/interface';
import { Father } from '@database/entities';
import { FatherService } from 'feature/father/Bussines/service';

@Controller('father')
export class FatherController {

  constructor(
    private readonly fatherService: FatherService
  ){}

  @HttpCode(HttpStatus.OK)
  @Get()
  public async findAll(): Promise<ApiResponse<Father[]>> {
    return {
      message: 'Padres obtenidos con éxito',
      data: await this.fatherService.findAll()
    }
  }
}
