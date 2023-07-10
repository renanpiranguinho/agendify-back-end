import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilityController } from '../availability.controller';
import { AvailabilityService } from '../availability.service';
import { JwtService } from '@nestjs/jwt';
import { AvailabilityRepository } from '../repository/availability.repository';
import { UsersRepository } from '../../users/repository/user.repository';
import { BusinessRepository } from '../../business/repository/business.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

describe('AvailabilityController', () => {
  let controller: AvailabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailabilityController],
      providers: [
        AvailabilityService,
        UsersRepository,
        BusinessRepository,
        AvailabilityRepository,
        PrismaService,
        JwtService,
      ],
    }).compile();

    controller = module.get<AvailabilityController>(AvailabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
