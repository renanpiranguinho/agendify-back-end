import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AddressService } from '../address.service';
import { AddressRepository } from '../repository/address.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import {
  mockCreateAddressInput,
  mockCreateAddressReturnService,
  mockRemoveAddressReturnService,
  mockUpdateAddressInput,
  mockUpdateAddressReturnService,
  mockedAddressId,
} from './mocks';
import { mockedUserId } from '../../users/tests/mocks';
import { NotFoundException } from '@nestjs/common';

describe('AddressService', () => {
  let addressService: AddressService;
  let addressRepository: AddressRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: AddressRepository,
          useValue: {
            create: jest.fn().mockReturnValue(mockCreateAddressReturnService),
            findById: jest.fn().mockReturnValue(mockCreateAddressReturnService),
            findMine: jest.fn().mockReturnValue([mockCreateAddressReturnService]),
            updateById: jest
              .fn()
              .mockReturnValue(mockUpdateAddressReturnService),
            delete: jest.fn().mockReturnValue(mockRemoveAddressReturnService),
          },
        },
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
    addressRepository = module.get<AddressRepository>(AddressRepository);
  });

  it('should be defined', () => {
    expect(addressService).toBeDefined();
  });

  describe('Create Address', () => {
    it('should be created an address and return successfully value', async () => {
      const response = await addressService.create(mockCreateAddressInput, mockedUserId);

      expect(response).toEqual(mockCreateAddressReturnService);
    });
  });

  describe('Find my Addresses', () => {
    it('should find my addresses', async () => {
      const address = await addressService.findMine(mockedUserId);

      expect(address).toEqual([mockCreateAddressReturnService]);
    });
  });

  describe('Find by Id', () => {
    it('should find an address by ID', async () => {
      const address = await addressService.findById(mockedAddressId);

      expect(address).toEqual(mockCreateAddressReturnService);
    });
  });

  describe('Update', () => {
    it('should update an address', async () => {
      const address = await addressService.update(
        mockedAddressId,
        mockUpdateAddressInput,
      );

      expect(address).toEqual(mockUpdateAddressReturnService);
    });

    it('should not update an address, throw not found error', async () => {
      jest.spyOn(addressRepository, 'findById').mockResolvedValueOnce(undefined);

      await expect(addressService.findById('invalid-id')).rejects.toEqual(
        new NotFoundException('Address not found'),
      );
    });
  });

  describe('Delete', () => {
    it('should delete an address', async () => {
      const address = await addressService.remove(
        mockedAddressId,
      );

      expect(address).toEqual(mockRemoveAddressReturnService);
    });

    it('should not delete an address and throw not found error', async () => {
      jest
        .spyOn(addressRepository, 'delete')
        .mockRejectedValueOnce(new Error());

      await expect(addressService.remove('invalid-id')).rejects.toEqual(
        new NotFoundException('Address not found'),
      );
    });
  });

});
