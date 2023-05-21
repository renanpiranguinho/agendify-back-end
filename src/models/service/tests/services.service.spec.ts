import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from '../services.service';
import { BusinessRepository } from '../../business/repository/business.repository';
import { ServicesRepository } from '../repository/services.repository';
import { UsersRepository } from '../../users/repository/user.repository';
import {
  mockCreateServiceReturnService,
  mockRemoveServiceReturnService,
  mockUpdateServiceReturnService,
} from './mocks';
import {
  mockCreateUserReturnService,
  mockRemoveUserReturnService,
  mockUpdateUserReturnService,
} from '../../users/tests/mocks';
import { mockCreateBusinessReturnService } from '../../business/tests/mocks';

describe('BusinessService', () => {
  let service: ServicesService;
  let businessRepository: BusinessRepository;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: ServicesRepository,
          useValue: {
            create: jest.fn().mockReturnValue(mockCreateServiceReturnService),
            findAll: jest
              .fn()
              .mockReturnValue([mockCreateServiceReturnService]),
            findById: jest.fn().mockReturnValue(mockCreateServiceReturnService),
            updateById: jest
              .fn()
              .mockReturnValue(mockUpdateServiceReturnService),
            delete: jest.fn().mockReturnValue(mockRemoveServiceReturnService),
          },
        },
        {
          provide: BusinessRepository,
          useValue: {
            findByOwner: jest
              .fn()
              .mockReturnValue(mockCreateBusinessReturnService),
            findById: jest
              .fn()
              .mockReturnValue(mockCreateBusinessReturnService),
          },
        },
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn().mockReturnValue(mockCreateUserReturnService),
            findById: jest.fn().mockReturnValue(mockCreateUserReturnService),
            findByEmail: jest.fn().mockReturnValue(mockCreateUserReturnService),
            findAll: jest.fn().mockReturnValue([mockCreateUserReturnService]),
            updateById: jest.fn().mockReturnValue(mockUpdateUserReturnService),
            updateByEmail: jest
              .fn()
              .mockReturnValue(mockUpdateUserReturnService),
            softDelete: jest.fn().mockReturnValue(mockRemoveUserReturnService),
            setRole: jest.fn().mockReturnValue(mockCreateUserReturnService),
          },
        },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    businessRepository = module.get<BusinessRepository>(BusinessRepository);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(businessRepository).toBeDefined();
    expect(usersRepository).toBeDefined();
  });
});
