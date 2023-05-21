import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from '../services.controller';
import { ServicesService } from '../services.service';
import { JwtService } from '@nestjs/jwt';
import {
  mockCreateServiceReturnService,
  mockRemoveServiceReturnService,
  mockUpdateServiceReturnService,
} from './mocks';

describe('BusinessController', () => {
  let controller: ServicesController;
  let service: ServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [
        {
          provide: ServicesService,
          useValue: {
            create: jest.fn().mockReturnValue(mockCreateServiceReturnService),
            findAll: jest
              .fn()
              .mockReturnValue([mockCreateServiceReturnService]),
            findById: jest.fn().mockReturnValue(mockCreateServiceReturnService),
            update: jest.fn().mockReturnValue(mockUpdateServiceReturnService),
            remove: jest.fn().mockReturnValue(mockRemoveServiceReturnService),
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

    controller = module.get<ServicesController>(ServicesController);
    service = module.get<ServicesService>(ServicesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
