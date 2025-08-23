import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', nullable: true })
  fullName?: string | null;

  @Column({ type: 'varchar', nullable: true })
  avatarUrl?: string | null;

  @Column({ type: 'text', nullable: true })
  bio?: string | null;
}
