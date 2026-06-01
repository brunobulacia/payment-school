/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { FatherService } from 'feature/father/Bussines/service';

@Controller('father')
export class FatherController {

  constructor(
    private readonly fatherService: FatherService
  ){}

  @Get()
  public findAll() {
    return this.fatherService.findAll();
  }
}
