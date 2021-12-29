import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../infra/dto';
import { User } from '../infra/entities';
import { IUser } from '../infra/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getByEmail(email: string): Promise<IUser> {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException(`User whit this ${email} does not exist`);
    }
    return user;
  }

  async create(user: CreateUserDto): Promise<IUser> {
    const newUser = await this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
