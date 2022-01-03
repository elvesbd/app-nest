import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../infra/dto';
import { IUser } from '../infra/interfaces';
import { UsersService } from '../services';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  private logger = new Logger(UsersController.name);

  @Get()
  getAllUsers(): Promise<IUser[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<IUser> {
    const newUser = await this.userService.create(user);
    return newUser;
  }

  @Get('email/:email')
  async getByEmail(@Param('email') email: string): Promise<IUser> {
    return this.userService.getByEmail(email);
  }

  @Get('id/:id')
  async getById(@Param('id') id: string): Promise<IUser> {
    this.logger.log(id);
    return this.userService.getById(Number(id));
  }
}
