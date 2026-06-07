import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly svc: PaymentService) {}

  // ── HTTP endpoints ──────────────────────────────────────────
  @Get('payments')
  @HttpCode(HttpStatus.OK)
  async getAllPaymentsHttp() {
    return {
      message: 'Pagos obtenidos con éxito',
      data: await this.svc.getAll(),
    };
  }

  // ── RabbitMQ RPC handlers ───────────────────────────────────
  @MessagePattern('ms_pagos.create_payment')
  async createPayment(@Payload() data: any) {
    return this.svc.create({
      familyId: String(data.familyId),
      amount: data.amount,
      currency: data.currency ?? 'BOB',
      method: data.method,
      periodCode: data.dueDate?.substring(0, 7),
      dueDate: data.dueDate,
    });
  }

  @MessagePattern('ms_pagos.get_balance')
  async getBalance(@Payload() data: any) {
    return this.svc.getBalance(String(data.familyId));
  }

  @MessagePattern('ms_pagos.get_all_payments')
  async getAllPayments() {
    return this.svc.getAll();
  }
}
