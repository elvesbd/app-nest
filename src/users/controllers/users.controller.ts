import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  SerializeOptions,
} from '@nestjs/common';
import { CreateUserDto } from '../infra/dto';
import { IUser } from '../infra/interfaces';
import { UsersService } from '../services';

@SerializeOptions({ strategy: 'excludeAll' })
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  private logger = new Logger(UsersController.name);

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const newUser = await this.userService.create(user);
    return newUser;
  }

  @Get('email/:email')
  async getByEmail(@Param('email') email: string) {
    return this.userService.getByEmail(email);
  }

  @Get('id/:id')
  async getById(@Param('id') id: string) {
    this.logger.log(id);
    return this.userService.getById(Number(id));
  }
}
