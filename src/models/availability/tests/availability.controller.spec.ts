import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilityController } from '../availability.controller';
import { AvailabilityService } from '../availability.service';
import { JwtService } from '@nestjs/jwt';
import { AvailabilityRepository } from '../repository/availability.repository';
import { UsersRepository } from '../../users/repository/user.repository';
import { BusinessRepository } from '../../business/repository/business.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import {
  mockCreateAvailabilityInput,
  mockCreateAvailabilityReturnController,
  mockCreateAvailabilityReturnService,
  mockFindAllAvailabilityReturnController,
  mockFindOneAvailabilityReturnController,
  mockRemoveAvailabilityReturnController,
  mockUpdateAvailabilityByBusinessReturnController,
  mockUpdateAvailabilityInput,
  mockUpdateAvailabilityReturnController,
  mockUpdateAvailabilityReturnService,
  mockUser,
  mockedAvailabilityId,
  mockedBusinessId,
} from './mocks';

describe('AvailabilityController', () => {
  let availabiltyController: AvailabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailabilityController],
      providers: [
        {
          provide: AvailabilityService,
          useValue: {
            create: jest
              .fn()
              .mockReturnValue(mockCreateAvailabilityReturnService),
            findAll: jest
              .fn()
              .mockReturnValue([mockCreateAvailabilityReturnService]),
            findOne: jest
              .fn()
              .mockReturnValue(mockCreateAvailabilityReturnService),
            findAvailabilityByBusiness: jest
              .fn()
              .mockReturnValue([mockCreateAvailabilityReturnService]),
            update: jest
              .fn()
              .mockReturnValue(mockUpdateAvailabilityReturnService),
            updateByBusiness: jest
              .fn()
              .mockReturnValue(mockUpdateAvailabilityReturnService),
            delete: jest
              .fn()
              .mockReturnValue(mockCreateAvailabilityReturnService),
          },
        },
        UsersRepository,
        BusinessRepository,
        AvailabilityRepository,
        PrismaService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    availabiltyController = module.get<AvailabilityController>(
      AvailabilityController,
    );
  });

  it('should be defined', () => {
    expect(availabiltyController).toBeDefined();
  });

  describe('Create Availability', () => {
    it('should create an availability', async () => {
      const availability = await availabiltyController.create(
        mockCreateAvailabilityInput,
        mockUser,
      );

      expect(availability).toEqual(mockCreateAvailabilityReturnController);
    });
  });

  describe('FindAll Availabilities', () => {
    it('should find all availabilities', async () => {
      const availability = await availabiltyController.findAll();

      expect(availability).toEqual(mockFindAllAvailabilityReturnController);
    });
  });

  describe('FindOne Availability', () => {
    it('should find an availability by id', async () => {
      const availability = await availabiltyController.findOne(
        mockedAvailabilityId,
      );

      expect(availability).toEqual(mockFindOneAvailabilityReturnController);
    });
  });

  describe('Find Availabilities by Business ID', () => {
    it('should find an availability by id', async () => {
      const availability = await availabiltyController.findBusinessAvailabilities(mockedBusinessId);

      expect(availability).toEqual(mockFindAllAvailabilityReturnController);
    });
  });

  describe('Update Availability', () => {
    it('should update an availability', async () => {
      const business = await availabiltyController.update(
        mockedAvailabilityId,
        mockUpdateAvailabilityInput,
        mockUser,
      );

      expect(business).toEqual(mockUpdateAvailabilityReturnController);
    });
  });

  describe('Update Availability By Business Id', () => {
    it('should update an availability by business ID', async () => {
      const business = await availabiltyController.updateByBusiness(
        mockedBusinessId,
        mockUpdateAvailabilityInput,
        mockUser,
      );

      expect(business).toEqual(mockUpdateAvailabilityByBusinessReturnController);
    });
  });

  describe('Remove Availability', () => {
    it('should remove an availability', async () => {
      const address = await availabiltyController.delete(
        mockedAvailabilityId,
        mockUser
      );

      expect(address).toEqual(mockRemoveAvailabilityReturnController);
    });
  });
});
