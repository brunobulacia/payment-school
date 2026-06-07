import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '@database/entities';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly repo: Repository<Payment>,
  ) {}

  async create(data: Partial<Payment>): Promise<Payment> {
    const payment = this.repo.create({
      ...data,
      status: 'CONFIRMED',
      externalId: `PAY-${Date.now()}`,
    });
    return this.repo.save(payment);
  }

  async getBalance(familyId: string) {
    const payments = await this.repo.find({
      where: { familyId },
      order: { createdAt: 'DESC' },
    });
    const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    return {
      familyId,
      totalPaid,
      currency: 'BOB',
      payments: payments.map((p) => ({
        id: p.id,
        amount: Number(p.amount),
        currency: p.currency,
        method: p.method,
        periodCode: p.periodCode,
        status: p.status,
        dueDate: p.dueDate,
        createdAt: p.createdAt,
      })),
    };
  }

  async getAll() {
    const payments = await this.repo.find({
      order: { createdAt: 'DESC' },
      take: 200,
    });
    return payments.map((p) => ({
      id: p.id,
      familyId: p.familyId,
      amount: Number(p.amount),
      currency: p.currency,
      method: p.method,
      periodCode: p.periodCode,
      status: p.status,
      dueDate: p.dueDate,
      createdAt: p.createdAt,
    }));
  }
}
