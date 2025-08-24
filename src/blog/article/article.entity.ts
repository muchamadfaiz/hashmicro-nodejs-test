import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { User } from '@/admin/user/user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ nullable: true })
  publishedAt?: Date;

  @ManyToOne(() => User, (user) => user.articles, { eager: true })
  author: User;

  @ManyToMany(() => Tag, (tag) => tag.articles, { cascade: true, eager: true })
  @JoinTable()
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
