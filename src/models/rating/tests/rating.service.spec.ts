import { Test, TestingModule } from '@nestjs/testing';
import { RatingService } from '../rating.service';
import { BusinessRepository } from '../../business/repository/business.repository';
import { UsersRepository } from '../../users/repository/user.repository';
import { RatingRepository } from '../repository/rating.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

describe('RatingService', () => {
  let service: RatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingService,
        RatingRepository,
        UsersRepository,
        BusinessRepository,
        PrismaService,
      ],
    }).compile();

    service = module.get<RatingService>(RatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
