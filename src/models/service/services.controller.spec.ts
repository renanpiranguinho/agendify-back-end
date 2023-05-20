import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { JwtService } from '@nestjs/jwt';

describe('BusinessController', () => {
  let controller: ServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [
        {
          provide: ServicesService,
          useValue: {
            create: jest.fn().mockReturnValue('mockCreateServiceReturnService'),
            findAll: jest
              .fn()
              .mockReturnValue(['mockCreateServiceReturnService']),
            updateById: jest
              .fn()
              .mockReturnValue('mockUpdateServiceReturnService'),
            softDelete: jest
              .fn()
              .mockReturnValue('mockRemoveServiceReturnService'),
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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
