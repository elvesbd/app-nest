import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IUser } from 'src/users/infra/interfaces';
import { AuthenticationService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<IUser> {
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}
