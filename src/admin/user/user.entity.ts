import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Exclude } from 'class-transformer';
import { Role } from '../role/role.entity';
import { Article } from '@/blog/article/article.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  username: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    nullable: false,
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  @Exclude({ toPlainOnly: true })
  verificationToken?: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  @Exclude({ toPlainOnly: true })
  resetToken?: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  @Exclude({ toPlainOnly: true })
  resetTokenExpires?: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile?: Profile;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];
}
