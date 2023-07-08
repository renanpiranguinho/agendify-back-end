import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { UsersRepository } from '../users/repository/user.repository';
import { BusinessRepository } from '../business/repository/business.repository';
import { AvailabilityRepository } from './repository/availability.repository';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AvailabilityController],
  providers: [
    AvailabilityService,
    UsersRepository,
    BusinessRepository,
    AvailabilityRepository,
    PrismaService,
    JwtService,
  ],
})
export class AvailabilityModule {}
