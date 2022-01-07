import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UserNotFoundException,
  UserWithEmailNotFoundException,
} from '../exceptions';
import { CreateUserDto } from '../infra/dto';
import { User } from '../infra/entities';
import { IUser } from '../infra/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  getAllUsers() {
    return this.usersRepository.find();
  }

  async getByEmail(email: string): Promise<IUser> {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new UserWithEmailNotFoundException(email);
    }
    return user;
  }

  async getById(id: number): Promise<IUser> {
    const user = await this.usersRepository.findOne({ id });
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  async create(user: CreateUserDto): Promise<IUser> {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
