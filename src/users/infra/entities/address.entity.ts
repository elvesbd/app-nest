import { Expose } from 'class-transformer';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '.';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  street: string;

  @Expose()
  @Column()
  city: string;

  @Expose()
  @Column()
  country: string;

  @OneToOne(() => User, (user: User) => user.address)
  user: User;
}
