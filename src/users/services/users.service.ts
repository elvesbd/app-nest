import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UserNotFoundException,
  UserWithEmailNotFoundException,
} from '../exceptions';
import { CreateUserDto } from '../infra/dto';
import { User } from '../infra/entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  getAllUsers() {
    return this.usersRepository.find();
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new UserWithEmailNotFoundException(email);
    }
    return user;
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  async create(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
