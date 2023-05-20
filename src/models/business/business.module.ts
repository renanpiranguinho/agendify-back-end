import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { PrismaService } from 'prisma/prisma.service';
import { BusinessRepository } from './repository/business.repository';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/repository/user.repository';
import { MulterModule } from '@nestjs/platform-express';

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
  ],
})
export class BusinessModule {}
