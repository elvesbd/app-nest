import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '../infra/dto';
import { User } from '../infra/entities';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let findOne: jest.Mock;
  let find: jest.Mock;
  let create: jest.Mock;
  let save: jest.Mock;

  beforeEach(async () => {
    findOne = jest.fn();
    find = jest.fn();
    create = jest.fn();
    save = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: { findOne, find, create, save },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      });
      test('should return the user', async () => {
        const fetchedUser = await service.getByEmail('teste@test.com');
        expect(fetchedUser).toEqual(user);
      });
    });

    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });
      test('should throw an error', async () => {
        const result = service.getByEmail('teste@test.com');
        expect(result).rejects.toThrow();
        //await expect(service.getByEmail('teste@test.com')).rejects.toThrow();
      });
    });
  });

  describe('when getting a user by id', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      });
      test('should return the user', async () => {
        const fetchedUser = await service.getById(1);
        expect(fetchedUser).toEqual(user);
      });
    });

    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });
      test('should throw an error', async () => {
        const result = service.getById(1);
        expect(result).rejects.toThrow();
        //await expect(service.getByEmail('teste@test.com')).rejects.toThrow();
      });
    });
  });

  describe('when getting all users by id', () => {
    describe('returns all users', () => {
      let users: User[];
      beforeEach(() => {
        users = [new User(), new User()];
        find.mockReturnValue(Promise.resolve(users));
      });
      test('should return the user', async () => {
        const fetchedUser = await service.getAllUsers();
        expect(fetchedUser).toEqual(users);
      });
    });

    describe('and the not users', () => {
      beforeEach(() => {
        find.mockReturnValue([]);
      });
      test('should throw an error', async () => {
        const result = await service.getAllUsers();
        expect(result).toEqual([]);
        //await expect(service.getByEmail('teste@test.com')).rejects.toThrow();
      });
    });
  });

  describe('when creating a user', () => {
    describe('returns user', () => {
      let user: CreateUserDto;
      beforeEach(() => {
        user = new CreateUserDto();
        create.mockReturnValue(Promise.resolve(user));
      });
      test('should return the user', async () => {
        const fetchedUser = await service.create(user);
        expect(fetchedUser).toEqual(user);
      });
    });
  });
});
