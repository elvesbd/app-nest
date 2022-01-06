import { Expose } from 'class-transformer';
import { User } from 'src/users/infra/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Expose()
  @ManyToOne(() => User, (user: User) => user.posts)
  author: User;
}
