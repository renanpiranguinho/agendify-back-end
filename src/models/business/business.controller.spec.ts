import { Test, TestingModule } from '@nestjs/testing';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { JwtService } from '@nestjs/jwt';

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
