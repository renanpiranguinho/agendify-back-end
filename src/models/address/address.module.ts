import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { GenerateToken } from '../../providers/generate-token';
import { AddressService } from './address.service';
import { AddressRepository } from './repository/address.repository';

@Module({
  imports: [],
  controllers: [AddressController],
  providers: [
    AddressRepository,
    AddressService,
    PrismaService,
    JwtService,
    GenerateToken,
  ],
})
export class AddressModule {}
