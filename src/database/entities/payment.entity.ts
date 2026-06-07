import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@core/entities';

@Entity('payments')
export class Payment extends BaseEntity {
  @Column({ name: 'family_id' })
  familyId!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({ length: 3, default: 'BOB' })
  currency!: string;

  @Column({ length: 20 })
  method!: string;

  @Column({ name: 'period_code', length: 20, nullable: true })
  periodCode?: string;

  @Column({ name: 'due_date', type: 'date', nullable: true })
  dueDate?: string;

  @Column({ length: 20, default: 'PENDING' })
  status!: string;

  @Column({ name: 'external_id', nullable: true })
  externalId?: string;
}
