import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { PrismaService } from 'prisma/prisma.service';
import { BusinessRepository } from './repository/business.repository';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/repository/user.repository';
import { MulterModule } from '@nestjs/platform-express';
import { AddressRepository } from '../address/repository/address.repository';
import { RatingRepository } from '../rating/repository/rating.repository';

@Module({
  imports: [
    MulterModule.register({
      dest: './src/uploads/business',
    }),
  ],
  controllers: [BusinessController],
  providers: [
    BusinessService,
    PrismaService,
    BusinessRepository,
    JwtService,
    UsersRepository,
    AddressRepository,
    RatingRepository,
  ],
})
export class BusinessModule {}
