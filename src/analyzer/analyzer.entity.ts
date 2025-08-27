import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'analyzers' })
export class Analyzer {
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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
