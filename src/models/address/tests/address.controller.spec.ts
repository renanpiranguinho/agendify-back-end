import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AddressService } from '../address.service';
import { AddressController } from '../address.controller';
import { AddressRepository } from '../repository/address.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import {
  mockCreateAddressInput,
  mockCreateAddressReturnController,
  mockCreateAddressReturnService,
  mockFindAddressReturnController,
  mockFindOneAddressReturnController,
  mockRemoveAddressReturnController,
  mockRemoveAddressReturnService,
  mockUpdateAddressInput,
  mockUpdateAddressReturnController,
  mockUpdateAddressReturnService,
  mockUser,
  mockedAddressId,
} from './mocks';

describe('AddressController', () => {
  let addressController: AddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        {
          provide: AddressService,
          useValue: {
            create: jest.fn().mockReturnValue(mockCreateAddressReturnService),
            findMine: jest
              .fn()
              .mockReturnValue([mockCreateAddressReturnService]),
            findById: jest.fn().mockReturnValue(mockCreateAddressReturnService),
            update: jest.fn().mockReturnValue(mockUpdateAddressReturnService),
            remove: jest.fn().mockReturnValue(mockRemoveAddressReturnService),
          },
        },
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

    addressController = module.get<AddressController>(AddressController);
  });

  it('should be defined', () => {
    expect(addressController).toBeDefined();
  });

  describe('Create Address', () => {
    it('should create an address', async () => {
      const address = await addressController.create(
        mockCreateAddressInput,
        mockUser,
      );

      expect(address).toEqual(mockCreateAddressReturnController);
    });
  });

  describe('Find my Addresses', () => {
    it('should find my addresses', async () => {
      const address = await addressController.findMe(mockUser);

      expect(address).toEqual(mockFindAddressReturnController);
    });
  });

  describe('Find by Id', () => {
    it('should find an address by ID', async () => {
      const address = await addressController.findOne(mockedAddressId);

      expect(address).toEqual(mockFindOneAddressReturnController);
    });
  });

  describe('Update', () => {
    it('should update an address', async () => {
      const address = await addressController.update(
        mockedAddressId,
        mockUpdateAddressInput,
      );

      expect(address).toEqual(mockUpdateAddressReturnController);
    });
  });

  describe('Remove', () => {
    it('should remove an address', async () => {
      const address = await addressController.remove(
        mockedAddressId,
      );

      expect(address).toEqual(mockRemoveAddressReturnController);
    });
  });
});
