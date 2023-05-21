import { Test, TestingModule } from '@nestjs/testing';
import { BusinessService } from '../business.service';
import { PrismaService } from '../../../../prisma/prisma.service';
import { BusinessRepository } from '../repository/business.repository';
import { UsersRepository } from '../../users/repository/user.repository';
import { mockCreateUserReturnService } from '../../users/tests/mocks';
import {
  mockCategory,
  mockCreateBusinessReturnService,
  mockRemoveBusinessReturnService,
  mockUpdateBusinessReturnService,
  mockUserCreatedBusiness,
} from './mocks';

describe('BusinessService', () => {
  let service: BusinessService;
  let businessRepository: BusinessRepository;
  let usersRepository: UsersRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessService,
        {
          provide: PrismaService,
          useValue: {
            category: {
              findFirst: jest.fn().mockReturnValue(mockCategory),
            },
            user: {
              update: jest.fn().mockReturnValue(mockUserCreatedBusiness),
            },
          },
        },
        {
          provide: BusinessRepository,
          useValue: {
            create: jest.fn().mockReturnValue(mockCreateBusinessReturnService),
            findAll: jest
              .fn()
              .mockReturnValue([mockCreateBusinessReturnService]),
            findById: jest
              .fn()
              .mockReturnValue(mockCreateBusinessReturnService),
            findByTel: jest
              .fn()
              .mockReturnValue(mockCreateBusinessReturnService),
            findByOwner: jest
              .fn()
              .mockReturnValue([mockCreateBusinessReturnService]),
            updateById: jest
              .fn()
              .mockReturnValue(mockUpdateBusinessReturnService),
            softDelete: jest
              .fn()
              .mockReturnValue(mockRemoveBusinessReturnService),
          },
        },
        {
          provide: UsersRepository,
          useValue: {
            findById: jest.fn().mockReturnValue(mockCreateUserReturnService),
          },
        },
      ],
    }).compile();

    service = module.get<BusinessService>(BusinessService);
    businessRepository = module.get<BusinessRepository>(BusinessRepository);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(businessRepository).toBeDefined();
    expect(usersRepository).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
