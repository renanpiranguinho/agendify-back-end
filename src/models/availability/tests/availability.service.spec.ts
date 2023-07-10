import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilityService } from '../availability.service';
import { JwtService } from '@nestjs/jwt';
import { BusinessRepository } from '../../business/repository/business.repository';
import { UsersRepository } from '../../users/repository/user.repository';
import { AvailabilityRepository } from '../repository/availability.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

describe('AvailabilityService', () => {
  let service: AvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvailabilityService,
        AvailabilityRepository,
        UsersRepository,
        BusinessRepository,
        PrismaService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    service = module.get<AvailabilityService>(AvailabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
