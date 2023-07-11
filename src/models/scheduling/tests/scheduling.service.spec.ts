import { Test, TestingModule } from '@nestjs/testing';
import { SchedulingService } from '../scheduling.service';
import { SchedulingRepository } from '../repository/scheduling.repository';
import { ServicesRepository } from '../../service/repository/services.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AvailabilityRepository } from '../../availability/repository/availability.repository';

describe('SchedulingService', () => {
  let service: SchedulingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulingService,
        ServicesRepository,
        SchedulingRepository,
        PrismaService,
        AvailabilityRepository,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    service = module.get<SchedulingService>(SchedulingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
