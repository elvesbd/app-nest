import { Controller, Get, Param } from '@nestjs/common';
import { IUser } from '../infra/interfaces';
import { UsersService } from '../services';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':email')
  async getByEmail(@Param('email') email: string): Promise<IUser> {
    return await this.userService.getByEmail(email);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<IUser> {
    return await this.userService.getById(+id);
  }
}
