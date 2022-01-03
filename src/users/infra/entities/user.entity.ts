import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync } from 'bcrypt';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ unique: true })
  email: string;

  @Expose()
  @Column()
  name: string;

  @Exclude()
  @Column()
  password: string;

  @Expose()
  @Column()
  phoneNumber: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
