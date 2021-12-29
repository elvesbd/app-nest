import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from 'src/users/services';
import { PostgresErrorCode } from 'src/database';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  async register(registrationData: any) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);

    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (e) {
      if (e?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('User with that email already exists.');
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        user.password,
      );

      if (!isPasswordMatching) {
        throw new BadRequestException('Wrong credentials provided.');
      }
      user.password = undefined;
      return user;
    } catch (e) {
      throw new BadRequestException('Wrong credentials provided.');
    }
  }
}
