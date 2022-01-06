import { Expose } from 'class-transformer';
import { Category } from 'src/categories/infra/entities';
import { User } from 'src/users/infra/entities';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  title: string;

  @Expose()
  @Column()
  content: string;

  @Column({ nullable: true })
  category?: string;

  @Expose()
  @ManyToOne(() => User, (user: User) => user.posts)
  author: User;

  @Expose()
  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
