import { Test, TestingModule } from '@nestjs/testing';
import { EncryptData } from '../../../utils/encrypt-data';
import { JwtService } from '@nestjs/jwt';
import { AddressService } from '../address.service';
import { AddressController } from '../address.controller';
import { AddressRepository } from '../repository/address.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

describe('Addressontroller', () => {
  let controller: AddressController;

beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
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

    controller = module.get<AddressController>(AddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
