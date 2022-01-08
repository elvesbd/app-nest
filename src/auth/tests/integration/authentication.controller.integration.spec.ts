import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthenticationController } from '../../../auth/controllers';
import { AuthenticationService } from '../../../auth/services';
import { User } from '../../../users/infra/entities';
import { UsersService } from '../../../users/services';
import { mockedConfigService, mockedJwtService } from '../../../utils/mocks';
import * as request from 'supertest';
import { mockedUser } from '../mocks';
import { plainToClass } from 'class-transformer';
import { Reflector } from '@nestjs/core';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;
  let app: INestApplication;
  let userData: User;

  beforeEach(async () => {
    userData = {
      ...mockedUser,
    };

    const usersRepository = {
      create: jest.fn().mockResolvedValue(plainToClass(User, userData)),
      save: jest.fn().mockReturnValue(Promise.resolve()),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        UsersService,
        AuthenticationService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();

    controller = await module.get(AuthenticationController);

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );

    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('when registering', () => {
    describe('and using valid data', () => {
      test('should respond with the data of the user without the password', async () => {
        const expectedData = {
          ...userData,
        };
        delete expectedData.password;
        return await request(app.getHttpServer())
          .post('/authentication/register')
          .send({
            email: mockedUser.email,
            name: mockedUser.name,
            password: '@l_1983sA',
            phoneNumber: mockedUser.phoneNumber,
          })
          /*  .end((err, res) => {
            console.log(res);
          }) */
          .expect(201)
          .expect(expectedData);
      });
    });
    describe('and using invalid data', () => {
      it('should throw an error', () => {
        return request(app.getHttpServer())
          .post('/authentication/register')
          .send({
            name: mockedUser.name,
          })
          .expect(400);
      });
    });
  });
});
