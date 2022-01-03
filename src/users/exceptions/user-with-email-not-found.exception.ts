import { NotFoundException } from '@nestjs/common';

export class UserWithEmailNotFoundException extends NotFoundException {
  constructor(email: string) {
    super(`User with email ${email} does not exists`);
  }
}
