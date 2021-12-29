import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthenticationGuard } from '../guards';
import { RegisterDto } from '../infra/dto';
import { RequestWitUser } from '../infra/interfaces/request-user.interface';
import { AuthenticationService } from '../services';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWitUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
