import { Test, TestingModule } from '@nestjs/testing';
import { BusinessService } from './business.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { BusinessRepository } from './repository/business.repository';
import { UsersRepository } from '../users/repository/user.repository';
import {
  mockCreateUserReturnService,
  mockRemoveUserReturnService,
  mockUpdateUserReturnService,
} from '../users/tests/mocks';

describe('BusinessService', () => {
  let service: BusinessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessService,
        {
          provide: PrismaService,
          useValue: {
            business: {
              create: jest
                .fn()
                .mockReturnValue('mockCreateBusinessReturnService'),
              findUnique: jest
                .fn()
                .mockReturnValue('mockCreateBusinessReturnService'),
              findMany: jest
                .fn()
                .mockReturnValue(['mockCreateBusinessReturnService']),
              update: jest
                .fn()
                .mockReturnValue('mockUpdateBusinessReturnService'),
              delete: jest
                .fn()
                .mockReturnValue('mockRemoveBusinessReturnService'),
            },
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

    service = module.get<BusinessService>(BusinessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
