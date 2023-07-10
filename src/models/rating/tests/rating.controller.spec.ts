import { Test, TestingModule } from '@nestjs/testing';
import { RatingController } from '../rating.controller';
import { RatingService } from '../rating.service';
import { BusinessRepository } from '../../business/repository/business.repository';
import { UsersRepository } from '../../users/repository/user.repository';
import { RatingRepository } from '../repository/rating.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('RatingController', () => {
  let controller: RatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingController],
      providers: [
        RatingService,
        RatingRepository,
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

    controller = module.get<RatingController>(RatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
