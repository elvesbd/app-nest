import { Expose } from 'class-transformer';
import { Category } from '../../../categories/infra/entities';
import { User } from '../../../users/infra/entities';
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

  @Column()
  category: string;

  @Expose()
  @ManyToOne(() => User, (user: User) => user.posts)
  author: User;

  @Expose()
  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  categories: Category[];
}
