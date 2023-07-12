import { Test, TestingModule } from '@nestjs/testing';
import { SchedulingController } from '../scheduling.controller';
import { SchedulingService } from '../scheduling.service';
import { SchedulingRepository } from '../repository/scheduling.repository';
import { AvailabilityRepository } from '../../availability/repository/availability.repository';
import { ServicesRepository } from '../../service/repository/services.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('SchedulingController', () => {
  let controller: SchedulingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulingController],
      providers: [
        SchedulingService,
        AvailabilityRepository,
        ServicesRepository,
        SchedulingRepository,
        PrismaService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    controller = module.get<SchedulingController>(SchedulingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
