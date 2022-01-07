import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { Expose } from 'class-transformer';
import { Address } from '.';
import { Post } from '../../../posts/infra/entities';

@Entity()
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ unique: true })
  email: string;

  @Expose()
  @Column()
  name: string;

  @Column()
  password: string;

  @Expose()
  @Column()
  phoneNumber: string;

  @Expose()
  @OneToOne(() => Address, { eager: true, cascade: true })
  @JoinColumn()
  address: Address;

  @Expose()
  @OneToMany(() => Post, (post: Post) => post.author)
  posts: Post[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
