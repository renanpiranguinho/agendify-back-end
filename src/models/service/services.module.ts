import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaService } from 'prisma/prisma.service';
import { ServicesRepository } from './repository/services.repository';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/repository/user.repository';
import { BusinessRepository } from '../business/repository/business.repository';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './src/uploads/services',
    }),
  ],
  controllers: [ServicesController],
  providers: [
    ServicesService,
    PrismaService,
    ServicesRepository,
    JwtService,
    BusinessRepository,
    UsersRepository,
  ],
})
export class ServicesModule {}
