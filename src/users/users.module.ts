import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
