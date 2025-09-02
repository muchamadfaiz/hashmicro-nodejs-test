import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../article/article.entity';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity({ name: 'tag' })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
