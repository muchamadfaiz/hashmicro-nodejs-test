import { BaseEntity } from '@/common/entities/base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'analyzers' })
export class Analyzer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  input1: string;

  @Column({ type: 'text' })
  input2: string;

  @Column({ type: 'float', nullable: true })
  percentageMatchChar?: number;

  @Column({ type: 'int', nullable: true })
  matchedCount?: number;

  @Column({ type: 'int', nullable: true })
  lengthInput1?: number;

  @Column('simple-array', { nullable: true })
  matchedChars?: string[];
}
