import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AddressService } from '../address.service';
import { AddressRepository } from '../repository/address.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

describe('AddressService', () => {
  let addressService: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        AddressRepository,
        PrismaService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    addressService = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(addressService).toBeDefined();
  });
});
