import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/infra/dto';
import { JwtAuthenticationGuard, LocalAuthenticationGuard } from '../guards';
import { RequestWitUser } from '../infra/interfaces';
import { AuthenticationService } from '../services';

@Controller('authentication')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    const user = await this.authenticationService.register(registrationData);
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWitUser) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logout(@Req() request: RequestWitUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async authenticate(@Req() request: RequestWitUser) {
    return request.user;
  }
}
