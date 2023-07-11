import { Module } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { UsersRepository } from '../users/repository/user.repository';
import { BusinessRepository } from '../business/repository/business.repository';
import { SchedulingRepository } from './repository/scheduling.repository';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ServicesRepository } from '../service/repository/services.repository';
import { AvailabilityRepository } from '../availability/repository/availability.repository';

@Module({
  controllers: [SchedulingController],
  providers: [
    SchedulingService,
    UsersRepository,
    BusinessRepository,
    SchedulingRepository,
    PrismaService,
    JwtService,
    ServicesRepository,
    AvailabilityRepository,
  ],
})
export class SchedulingModule {}
