import { Test, TestingModule } from '@nestjs/testing';
import { EncryptData } from '../../../utils/encrypt-data';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import {
  mockCreateUserInput,
  mockCreateUserReturnController,
  mockCreateUserReturnService,
  mockFindAllUserReturnController,
  mockFindOneUserReturnController,
  mockRemoveUserReturnController,
  mockRemoveUserReturnService,
  mockSetRoleReturnService,
  mockSetRoleUserReturnController,
  mockUpdateUserInput,
  mockUpdateUserReturnController,
  mockUpdateUserReturnService,
  mockedUserId,
  mockedUserRole,
} from './mocks';
import { JwtService } from '@nestjs/jwt';
import { mockUser } from '../../../auth/tests/mocks';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockReturnValue(mockCreateUserReturnService),
            findById: jest.fn().mockReturnValue(mockCreateUserReturnService),
            findAll: jest.fn().mockReturnValue([mockCreateUserReturnService]),
            update: jest.fn().mockReturnValue(mockUpdateUserReturnService),
            remove: jest.fn().mockReturnValue(mockRemoveUserReturnService),
            setRole: jest.fn().mockReturnValue(mockSetRoleReturnService),
          },
        },
        {
          provide: EncryptData,
          useValue: {
            encrypt: jest
              .fn()
              .mockReturnValue(mockCreateUserReturnService.password),
            decrypt: jest.fn().mockReturnValue(true),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('Create User', () => {
    it('should be create user return successfully value', async () => {
      const response = await usersController.create(mockCreateUserInput);

      expect(response).toEqual(mockCreateUserReturnController);
    });

    it('should be create user throw error', async () => {
      jest.spyOn(usersService, 'create').mockRejectedValueOnce(new Error());

      expect(
        usersController.create(mockCreateUserInput),
      ).rejects.toThrowError();
    });
  });

  describe('Find All User', () => {
    it('should be find all users return successfully value', async () => {
      const response = await usersController.findAll();

      expect(response).toEqual(mockFindAllUserReturnController);
    });

    it('should be find all users throw error', async () => {
      jest.spyOn(usersService, 'findAll').mockRejectedValueOnce(new Error());

      expect(usersController.findAll()).rejects.toThrowError();
    });
  });

  describe('Find One User', () => {
    it('should be find one user return successfully value', async () => {
      const response = await usersController.findOne('ugevfkhbwek');

      expect(response).toEqual(mockFindOneUserReturnController);
    });

    it('should be find one user throw error', async () => {
      jest.spyOn(usersService, 'findById').mockRejectedValueOnce(new Error());

      expect(usersController.findOne('ugevfkhbwek')).rejects.toThrowError();
    });
  });

  describe('Update User', () => {
    it('should be update user return successfully value', async () => {
      const response = await usersController.update(
        'ugevfkhbwek',
        mockUpdateUserInput,
      );

      expect(response).toEqual(mockUpdateUserReturnController);
    });

    it('should be update user throw a error', async () => {
      jest.spyOn(usersService, 'update').mockRejectedValueOnce(new Error());

      expect(
        usersController.update('ugevfkhbwek', mockUpdateUserInput),
      ).rejects.toThrowError();
    });
  });

  describe('Remove User', () => {
    it('should be remove user return successfully value', async () => {
      const response = await usersController.remove('ugevfkhbwek');

      expect(response).toEqual(mockRemoveUserReturnController);
    });

    it('should be remove user throw a error', async () => {
      jest.spyOn(usersService, 'remove').mockRejectedValueOnce(new Error());

      expect(usersController.remove('ugevfkhbwek')).rejects.toThrowError();
    });
  });

  describe('Find me', () => {
    it('should be find me return successfully value', async () => {
      const response = await usersController.findMe(mockUser);

      expect(response).toEqual(mockFindOneUserReturnController);
    });

    it('should be find me throw a error', async () => {
      jest.spyOn(usersService, 'findById').mockRejectedValueOnce(new Error());

      expect(usersController.findMe(mockUser)).rejects.toThrowError();
    });
  });

  describe('Set Role', () => {
    it('should be set role return successfully value', async () => {
      const response = await usersController.setRole(
        mockedUserId,
        mockedUserRole,
      );

      expect(response).toEqual(mockSetRoleUserReturnController);
    });

    it('should be set role throw a error', async () => {
      jest.spyOn(usersService, 'setRole').mockRejectedValueOnce(new Error());

      expect(
        usersController.setRole(mockedUserId, mockedUserRole),
      ).rejects.toThrowError();
    });
  });
});
