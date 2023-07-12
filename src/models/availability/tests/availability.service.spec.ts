import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilityService } from '../availability.service';
import { JwtService } from '@nestjs/jwt';
import { BusinessRepository } from '../../business/repository/business.repository';
import { UsersRepository } from '../../users/repository/user.repository';
import { AvailabilityRepository } from '../repository/availability.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import {
  createdUser,
  mockCreateAvailabilityArrayReturnService,
  mockCreateAvailabilityInput,
  mockCreateAvailabilityReturnService,
  mockCreateAvailabilityWeekDayIdInput,
  mockCreateAvailabilityWeekDayIdReturnService,
  mockFindAllAvailabilityReturnService,
  mockFindByBusinessAvailabilityReturnService,
  mockFindOneAvailabilityReturnService,
  mockUpdateAvailabilityArrayInput,
  mockUpdateAvailabilityInput,
  mockUpdateAvailabilityReturnService,
  mockUpdateByBusinessReturnService,
  mockUpdateByBusinessWeekDayReturnService,
  mockedAvailabilityId,
} from './mocks';
import { mockedUserId } from '../../users/tests/mocks';
import { mockCreateBusinessReturnService } from '../../business/tests/mocks';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AvailabilityService', () => {
  let availabilityService: AvailabilityService;
  let usersRepository: UsersRepository;
  let businessRepository: BusinessRepository;
  let availabilityRepository: AvailabilityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvailabilityService,
        {
          provide: AvailabilityRepository,
          useValue: {
            create: jest.fn(),
            findOne: jest
              .fn()
              .mockReturnValue(mockFindOneAvailabilityReturnService),
            findAvailabilityByBusiness: jest
              .fn()
              .mockReturnValue([mockCreateAvailabilityReturnService]),
            findAll: jest.fn(),
            update: jest.fn(),
            updateByBusinessWeekDay: jest.fn(),
            delete: jest.fn(),
          },
        },
        UsersRepository,
        BusinessRepository,
        PrismaService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    availabilityService = module.get<AvailabilityService>(AvailabilityService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    businessRepository = module.get<BusinessRepository>(BusinessRepository);
    availabilityRepository = module.get<AvailabilityRepository>(
      AvailabilityRepository,
    );
  });

  it('should be defined', () => {
    expect(availabilityService).toBeDefined();
    expect(usersRepository).toBeDefined();
    expect(businessRepository).toBeDefined();
    expect(availabilityRepository).toBeDefined();
  });

  describe('Create Availability', () => {
    it('should be created an availability using a weekday array and return successfully value', async () => {
      jest
        .spyOn(usersRepository, 'findById')
        .mockResolvedValueOnce(createdUser);
      jest
        .spyOn(businessRepository, 'findById')
        .mockResolvedValueOnce(mockCreateBusinessReturnService);
      jest
        .spyOn(businessRepository, 'findByOwner')
        .mockResolvedValueOnce([mockCreateBusinessReturnService]);
      jest.spyOn(availabilityRepository, 'create').mockResolvedValueOnce({
        ...mockCreateAvailabilityReturnService,
        weekdays_id: mockCreateAvailabilityInput.weekdays[0],
      });
      jest.spyOn(availabilityRepository, 'create').mockResolvedValueOnce({
        ...mockCreateAvailabilityReturnService,
        weekdays_id: mockCreateAvailabilityInput.weekdays[1],
      });

      const response = await availabilityService.create(
        mockCreateAvailabilityInput,
        mockedUserId,
      );

      expect(response).toEqual(mockCreateAvailabilityArrayReturnService);
    });

    it('should be created an availability using a weekday_id and return successfully value', async () => {
      jest
        .spyOn(usersRepository, 'findById')
        .mockResolvedValueOnce(createdUser);
      jest
        .spyOn(businessRepository, 'findById')
        .mockResolvedValueOnce(mockCreateBusinessReturnService);
      jest
        .spyOn(businessRepository, 'findByOwner')
        .mockResolvedValueOnce([mockCreateBusinessReturnService]);
      jest
        .spyOn(availabilityRepository, 'create')
        .mockResolvedValueOnce(mockCreateAvailabilityWeekDayIdReturnService);

      const response = await availabilityService.create(
        mockCreateAvailabilityWeekDayIdInput,
        mockedUserId,
      );

      expect(response).toEqual([mockCreateAvailabilityWeekDayIdReturnService]);
    });

    it('should not create an availability using a weekday_id and return User does not exist', async () => {
      jest.spyOn(usersRepository, 'findById').mockResolvedValueOnce(undefined);

      await expect(
        availabilityService.create(
          mockCreateAvailabilityWeekDayIdInput,
          mockedUserId,
        ),
      ).rejects.toEqual(new NotFoundException('User does not exist'));
    });

    it('should not create an availability using a weekday_id and return Business not found', async () => {
      jest
        .spyOn(usersRepository, 'findById')
        .mockResolvedValueOnce(createdUser);
      jest
        .spyOn(businessRepository, 'findById')
        .mockResolvedValueOnce(undefined);

      await expect(
        availabilityService.create(
          mockCreateAvailabilityWeekDayIdInput,
          mockedUserId,
        ),
      ).rejects.toEqual(new NotFoundException('Business not found'));
    });

    it('should not create an availability using a weekday_id and return Business not belong user', async () => {
      jest
        .spyOn(usersRepository, 'findById')
        .mockResolvedValueOnce(createdUser);
      jest
        .spyOn(businessRepository, 'findById')
        .mockResolvedValueOnce(mockCreateBusinessReturnService);
      jest.spyOn(businessRepository, 'findByOwner').mockResolvedValueOnce([]);

      await expect(
        availabilityService.create(
          mockCreateAvailabilityWeekDayIdInput,
          mockedUserId,
        ),
      ).rejects.toEqual(new BadRequestException('Business not belong user'));
    });

    it('should not create an availability using a weekday_id and return BAD_REQUEST', async () => {
      jest
        .spyOn(usersRepository, 'findById')
        .mockResolvedValueOnce(createdUser);
      jest
        .spyOn(businessRepository, 'findById')
        .mockResolvedValueOnce(mockCreateBusinessReturnService);
      jest
        .spyOn(businessRepository, 'findByOwner')
        .mockResolvedValueOnce([mockCreateBusinessReturnService]);
      jest
        .spyOn(availabilityRepository, 'findAvailabilityByBusiness')
        .mockResolvedValueOnce([mockCreateAvailabilityWeekDayIdReturnService]);
      jest
        .spyOn(availabilityRepository, 'create')
        .mockResolvedValueOnce(mockCreateAvailabilityWeekDayIdReturnService);

      await expect(
        availabilityService.create(
          mockCreateAvailabilityWeekDayIdInput,
          mockedUserId,
        ),
      ).rejects.toEqual(
        new BadRequestException(
          'Business Already have an Availability Created with the week days: [3], please update or delete it',
        ),
      );
    });

    it('should not create an availability using a weekday array and return error', async () => {
      jest
        .spyOn(usersRepository, 'findById')
        .mockResolvedValueOnce(createdUser);
      jest
        .spyOn(businessRepository, 'findById')
        .mockResolvedValueOnce(mockCreateBusinessReturnService);
      jest
        .spyOn(businessRepository, 'findByOwner')
        .mockResolvedValueOnce([mockCreateBusinessReturnService]);
      jest
        .spyOn(availabilityRepository, 'create')
        .mockResolvedValueOnce(undefined);

      await expect(
        availabilityService.create(mockCreateAvailabilityInput, mockedUserId),
      ).rejects.toEqual(new BadRequestException('Error creating availability'));
    });

    it('should not create an availability using a weekday_id and return error', async () => {
      jest
        .spyOn(usersRepository, 'findById')
        .mockResolvedValueOnce(createdUser);
      jest
        .spyOn(businessRepository, 'findById')
        .mockResolvedValueOnce(mockCreateBusinessReturnService);
      jest
        .spyOn(businessRepository, 'findByOwner')
        .mockResolvedValueOnce([mockCreateBusinessReturnService]);
      jest
        .spyOn(availabilityRepository, 'create')
        .mockResolvedValueOnce(undefined);

      await expect(
        availabilityService.create(
          mockCreateAvailabilityWeekDayIdInput,
          mockedUserId,
        ),
      ).rejects.toEqual(new BadRequestException('Error creating availability'));
    });
  });

  describe('Find One Availability', () => {
    it('should find one availability and return success', async () => {
      const response = await availabilityService.findOne(mockedAvailabilityId);

      expect(response).toEqual({
        ...mockCreateAvailabilityReturnService,
        weekdays_id: mockCreateAvailabilityInput.weekdays[0],
      });
    });

    it('should not find an availability and throw not found error', async () => {
      jest
        .spyOn(availabilityRepository, 'findOne')
        .mockResolvedValueOnce(undefined);

      await expect(availabilityService.findOne('invalid-id')).rejects.toEqual(
        new NotFoundException('Availability not found'),
      );
    });
  });

  describe('Find Availabilities By Business ID', () => {
    it('should find many availabilities and return success', async () => {
      jest
        .spyOn(availabilityRepository, 'findAvailabilityByBusiness')
        .mockResolvedValueOnce(mockFindByBusinessAvailabilityReturnService);
      jest
        .spyOn(businessRepository, 'findById')
        .mockResolvedValueOnce(mockCreateBusinessReturnService);

      const response = await availabilityService.findAvailabilityByBusiness(
        mockedAvailabilityId,
      );

      expect(response).toEqual(mockCreateAvailabilityArrayReturnService);
    });

    it('should not find availabilitys and throw business ID error ', async () => {
      jest
        .spyOn(businessRepository, 'findById')
        .mockResolvedValueOnce(undefined);

      await expect(
        availabilityService.findAvailabilityByBusiness('invalid-id'),
      ).rejects.toEqual(new BadRequestException('Business does not exist'));
    });
  });

  describe('Find All Availabilities', () => {
    it('should find all availabilities and return success', async () => {
      jest
        .spyOn(availabilityRepository, 'findAll')
        .mockResolvedValueOnce(mockFindAllAvailabilityReturnService);
      const response = await availabilityService.findAll();

      expect(response).toEqual(mockCreateAvailabilityArrayReturnService);
    });
  });

  describe('Update Availability', () => {
    it('should update an availability and return success', async () => {
      jest
        .spyOn(availabilityRepository, 'findOne')
        .mockResolvedValueOnce(mockFindOneAvailabilityReturnService);
      jest.spyOn(businessRepository, 'findByOwner').mockResolvedValueOnce([
        {
          ...mockCreateBusinessReturnService,
          id: mockCreateAvailabilityInput.business_id,
        },
      ]);
      jest
        .spyOn(availabilityRepository, 'update')
        .mockResolvedValueOnce(mockUpdateAvailabilityReturnService);
      const response = await availabilityService.update(
        mockedAvailabilityId,
        mockUpdateAvailabilityInput,
        mockedUserId,
      );

      expect(response).toEqual(mockUpdateAvailabilityReturnService);
    });

    it('should not update an availability and throw not found error', async () => {
      jest
        .spyOn(availabilityRepository, 'findOne')
        .mockResolvedValueOnce(undefined);

      await expect(
        availabilityService.update(
          'invalid-id',
          mockUpdateAvailabilityInput,
          mockedUserId,
        ),
      ).rejects.toEqual(new NotFoundException('Availability not found'));
    });

    it('should not update an availability and return Business not belong user', async () => {
      jest
        .spyOn(availabilityRepository, 'findOne')
        .mockResolvedValueOnce(mockFindOneAvailabilityReturnService);
      jest.spyOn(businessRepository, 'findByOwner').mockResolvedValueOnce([]);

      await expect(
        availabilityService.update(
          mockedAvailabilityId,
          mockUpdateAvailabilityInput,
          mockedUserId,
        ),
      ).rejects.toEqual(new BadRequestException('Business not belong user'));
    });
  });

  describe('Update Availability By Business ID', () => {
    it('should update an availability by business id with weekday_id and return success', async () => {
      jest
        .spyOn(businessRepository, 'findById')
        .mockResolvedValueOnce(mockCreateBusinessReturnService);
      jest
        .spyOn(availabilityRepository, 'findOne')
        .mockResolvedValueOnce(mockFindOneAvailabilityReturnService);
      jest
        .spyOn(businessRepository, 'findByOwner')
        .mockResolvedValueOnce([mockCreateBusinessReturnService]);
      jest
        .spyOn(availabilityRepository, 'updateByBusinessWeekDay')
        .mockResolvedValueOnce(mockUpdateByBusinessWeekDayReturnService);

      const response = await availabilityService.updateByBusiness(
        mockCreateBusinessReturnService.id,
        mockUpdateAvailabilityInput,
        mockedUserId,
      );

      expect(response).toEqual([mockUpdateByBusinessReturnService]);
    });

    it('should update an availability by business id with weekdays array and return success', async () => {
      jest
        .spyOn(businessRepository, 'findById')
        .mockResolvedValueOnce(mockCreateBusinessReturnService);
      jest
        .spyOn(businessRepository, 'findByOwner')
        .mockResolvedValueOnce([mockCreateBusinessReturnService]);
      jest
        .spyOn(availabilityRepository, 'updateByBusinessWeekDay')
        .mockResolvedValue(mockUpdateByBusinessWeekDayReturnService);

      const response = await availabilityService.updateByBusiness(
        mockCreateBusinessReturnService.id,
        mockUpdateAvailabilityArrayInput,
        mockedUserId,
      );

      expect(response).toEqual([
        mockUpdateByBusinessReturnService,
        mockUpdateByBusinessReturnService,
      ]);
    });

    it('should not update an availability by business id with weekdays array and return business not found error', async () => {
      jest
        .spyOn(businessRepository, 'findById')
        .mockResolvedValueOnce(undefined);

      await expect(
        availabilityService.updateByBusiness(
          'invalid-id',
          mockUpdateAvailabilityArrayInput,
          mockedUserId,
        ),
      ).rejects.toEqual(new NotFoundException('Business not found'));
    });

    it('should not update an availability by business id with weekdays array and return business not belong to user error', async () => {
      jest
        .spyOn(businessRepository, 'findById')
        .mockResolvedValueOnce(mockCreateBusinessReturnService);
      jest.spyOn(businessRepository, 'findByOwner').mockResolvedValueOnce([]);

      await expect(
        availabilityService.updateByBusiness(
          mockedAvailabilityId,
          mockUpdateAvailabilityArrayInput,
          mockedUserId,
        ),
      ).rejects.toEqual(new BadRequestException('Business not belong user'));
    });

    it('should not update an availability by business id with weekdays array and return error', async () => {
      jest
        .spyOn(businessRepository, 'findById')
        .mockResolvedValueOnce(mockCreateBusinessReturnService);
      jest
        .spyOn(businessRepository, 'findByOwner')
        .mockResolvedValueOnce([mockCreateBusinessReturnService]);
      jest
        .spyOn(availabilityRepository, 'updateByBusinessWeekDay')
        .mockResolvedValue(undefined);

      await expect(
        availabilityService.updateByBusiness(
          mockedAvailabilityId,
          mockUpdateAvailabilityArrayInput,
          mockedUserId,
        ),
      ).rejects.toEqual(new BadRequestException('Error creating availability'));
    });

    it('should not update an availability by business id with weekday_id and return error', async () => {
      jest
        .spyOn(businessRepository, 'findById')
        .mockResolvedValueOnce(mockCreateBusinessReturnService);
      jest
        .spyOn(availabilityRepository, 'findOne')
        .mockResolvedValueOnce(mockFindOneAvailabilityReturnService);
      jest
        .spyOn(businessRepository, 'findByOwner')
        .mockResolvedValueOnce([mockCreateBusinessReturnService]);
      jest
        .spyOn(availabilityRepository, 'updateByBusinessWeekDay')
        .mockResolvedValueOnce(undefined);

      await expect(
        availabilityService.updateByBusiness(
          mockedAvailabilityId,
          mockUpdateAvailabilityArrayInput,
          mockedUserId,
        ),
      ).rejects.toEqual(new BadRequestException('Error creating availability'));
    });
  });

  describe('Delete Availability', () => {
    it('should delete an availability and return success', async () => {
      jest
        .spyOn(availabilityRepository, 'findOne')
        .mockResolvedValueOnce(mockFindOneAvailabilityReturnService);
      jest.spyOn(businessRepository, 'findByOwner').mockResolvedValueOnce([
        {
          ...mockCreateBusinessReturnService,
          id: mockCreateAvailabilityInput.business_id,
        },
      ]);
      jest
        .spyOn(availabilityRepository, 'delete')
        .mockResolvedValueOnce(mockCreateAvailabilityReturnService);

      const response = await availabilityService.delete(
        mockedAvailabilityId,
        mockedUserId,
      );

      expect(response).toEqual(mockCreateAvailabilityReturnService);
    });

    it('should not delete an availability and throw not found error', async () => {
      jest
        .spyOn(availabilityRepository, 'findOne')
        .mockReturnValueOnce(undefined);

      await expect(
        availabilityService.delete('invalid-id', mockedUserId),
      ).rejects.toEqual(new NotFoundException('Availability not found'));
    });

    it('should not delete an availability and throw Business not belong user', async () => {
      jest
        .spyOn(availabilityRepository, 'findOne')
        .mockResolvedValueOnce(mockFindOneAvailabilityReturnService);
      jest.spyOn(businessRepository, 'findByOwner').mockResolvedValueOnce([]);

      await expect(
        availabilityService.delete(mockedAvailabilityId, mockedUserId),
      ).rejects.toEqual(new BadRequestException('Business not belong to user'));
    });
  });
});
