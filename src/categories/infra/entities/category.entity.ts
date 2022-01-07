import { Post } from 'src/posts/infra/entities';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Post, (post: Post) => post.categories)
  posts: Post[];
}
