import { Test, TestingModule } from '@nestjs/testing';
import { BusinessController } from '../business.controller';
import { BusinessService } from '../business.service';
import { JwtService } from '@nestjs/jwt';
import {
  mockCreateBusinessReturnService,
  mockRemoveBusinessReturnService,
  mockUpdateBusinessReturnService,
} from './mocks';

describe('BusinessController', () => {
  let controller: BusinessController;
  let businessService: BusinessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessController],
      providers: [
        {
          provide: BusinessService,
          useValue: {
            create: jest.fn().mockReturnValue(mockCreateBusinessReturnService),
            findAll: jest
              .fn()
              .mockReturnValue([mockCreateBusinessReturnService]),
            findById: jest
              .fn()
              .mockReturnValue(mockCreateBusinessReturnService),
            findByOwner: jest
              .fn()
              .mockReturnValue([mockCreateBusinessReturnService]),
            update: jest.fn().mockReturnValue(mockUpdateBusinessReturnService),
            remove: jest.fn().mockReturnValue(mockRemoveBusinessReturnService),
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

    controller = module.get<BusinessController>(BusinessController);
    businessService = module.get<BusinessService>(BusinessService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(businessService).toBeDefined();
  });
});
