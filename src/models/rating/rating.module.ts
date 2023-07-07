import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { UsersRepository } from '../users/repository/user.repository';
import { BusinessRepository } from '../business/repository/business.repository';
import { RatingRepository } from './repository/rating.repository';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [RatingController],
  providers: [
    RatingService,
    UsersRepository,
    BusinessRepository,
    RatingRepository,
    PrismaService,
    JwtService,
  ],
})
export class RatingModule {}
