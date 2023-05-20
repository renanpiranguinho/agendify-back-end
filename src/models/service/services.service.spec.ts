import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { BusinessRepository } from '../business/repository/business.repository';
import { ServicesRepository } from './repository/services.repository';
import { UsersRepository } from '../users/repository/user.repository';
import {
  mockCreateUserReturnService,
  mockRemoveUserReturnService,
  mockUpdateUserReturnService,
} from '../users/tests/mocks';

describe('BusinessService', () => {
  let service: ServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: ServicesRepository,
          useValue: {
            create: jest.fn().mockReturnValue('mockCreateServiceReturnService'),
            findAll: jest
              .fn()
              .mockReturnValue(['mockCreateServiceReturnService']),
            findById: jest
              .fn()
              .mockReturnValue('mockCreateServiceReturnService'),
          },
        },
        {
          provide: BusinessRepository,
          useValue: {
            create: jest
              .fn()
              .mockReturnValue('mockCreateBusinessReturnService'),
            findByEmail: jest
              .fn()
              .mockReturnValue('mockCreateBusinessReturnService'),
            findAll: jest
              .fn()
              .mockReturnValue(['mockCreateBusinessReturnService']),
            updateByEmail: jest
              .fn()

              .mockReturnValue('mockUpdateBusinessReturnService'),
            findById: jest
              .fn()
              .mockReturnValue('mockCreateBusinessReturnService'),
            updateById: jest

              .fn()
              .mockReturnValue('mockUpdateBusinessReturnService'),
            softDelete: jest
              .fn()
              .mockReturnValue('mockRemoveBusinessReturnService'),
          },
        },
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn().mockReturnValue(mockCreateUserReturnService),
            findByEmail: jest.fn().mockReturnValue(mockCreateUserReturnService),
            findAll: jest.fn().mockReturnValue([mockCreateUserReturnService]),
            updateByEmail: jest
              .fn()
              .mockReturnValue(mockUpdateUserReturnService),
            findById: jest.fn().mockReturnValue(mockCreateUserReturnService),
            updateById: jest.fn().mockReturnValue(mockUpdateUserReturnService),
            softDelete: jest.fn().mockReturnValue(mockRemoveUserReturnService),
          },
        },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
