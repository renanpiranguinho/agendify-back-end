import { HttpStatus } from '@nestjs/common';
import { NestResponseBuilder } from '../../../core/http/nestResponseBuilder';
import { Role } from '../../users/enums/role.enum';
import { mockedUserId } from '../../users/tests/mocks';
import { CreateAvailabilityDto } from '../dto/create-availability.dto';
import { Availability } from '../entities/availability.entity';
import { UpdateAvailabilityDto } from '../dto/update-availability.dto';
import { User } from '../../users/entities/user.entity';

export const mockedAvailabilityId = '307171f1-7eef-449c-808c-a70f54b96139';
export const mockedAvailabilityId2 = '127171f1-7eef-449c-808c-a70f54b96139';
export const mockedBusinessId = '207171f1-7eef-449c-808c-a70f54b96139';

export const mockUser = {
  user: {
    id: mockedUserId,
    name: 'test',
    email: 'test@test.com',
    role: Role.USER,
    is_active: true,
  },
};

export const createdUser: User = {
  id: mockedUserId,
  ...mockUser.user,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

export const mockCreateAvailabilityInput: CreateAvailabilityDto = {
  business_id: mockedBusinessId,
  start_time: '12:00:00',
  end_time: '13:00:00',
  weekdays: ['1', '2'],
};

export const mockCreateAvailabilityWeekDayIdInput: CreateAvailabilityDto = {
  business_id: mockedBusinessId,
  start_time: '12:00:00',
  end_time: '13:00:00',
  weekdays_id: '3',
};

export const mockCreateAvailabilityWeekDayIdReturnService: Availability = {
  id: mockedAvailabilityId2,
  ...mockCreateAvailabilityWeekDayIdInput,
  weekdays_id: mockCreateAvailabilityWeekDayIdInput.weekdays_id,
  created_at: new Date(),
  updated_at: new Date(),
};

export const mockCreateAvailabilityReturnService: Availability = {
  id: mockedAvailabilityId,
  weekdays_id: null,
  ...mockCreateAvailabilityInput,
  created_at: new Date(),
  updated_at: new Date(),
};

export const mockCreateAvailabilityFindByBusinessReturnService: Availability = {
  id: mockedAvailabilityId,
  weekdays_id: 'irrelevant-id',
  ...mockCreateAvailabilityInput,
  created_at: new Date(),
  updated_at: new Date(),
};

export const mockCreateAvailabilityArrayReturnService: Availability[] = [
  {
    ...mockCreateAvailabilityReturnService,
    weekdays_id: mockCreateAvailabilityInput.weekdays[0],
  },
  {
    ...mockCreateAvailabilityReturnService,
    weekdays_id: mockCreateAvailabilityInput.weekdays[1],
  },
];

export const mockFindOneAvailabilityReturnService: Availability = {
  ...mockCreateAvailabilityReturnService,
  weekdays_id: mockCreateAvailabilityInput.weekdays[0],
  start_time: new Date('1970-01-01T12:00:00.000Z'),
  end_time: new Date('1970-01-01T13:00:00.000Z'),
};

export const mockFindAllAvailabilityReturnService: Availability[] = [
  {
    ...mockCreateAvailabilityReturnService,
    start_time: new Date('1970-01-01T12:00:00.000Z'),
    end_time: new Date('1970-01-01T13:00:00.000Z'),
    weekdays_id: mockCreateAvailabilityInput.weekdays[0],
  },
  {
    ...mockCreateAvailabilityReturnService,
    start_time: new Date('1970-01-01T12:00:00.000Z'),
    end_time: new Date('1970-01-01T13:00:00.000Z'),
    weekdays_id: mockCreateAvailabilityInput.weekdays[1],
  },
];

export const mockFindByBusinessAvailabilityReturnService: Availability[] = [
  {
    ...mockCreateAvailabilityReturnService,
    start_time: new Date('1970-01-01T12:00:00.000Z'),
    end_time: new Date('1970-01-01T13:00:00.000Z'),
    weekdays_id: mockCreateAvailabilityInput.weekdays[0],
  },
  {
    ...mockCreateAvailabilityReturnService,
    start_time: new Date('1970-01-01T12:00:00.000Z'),
    end_time: new Date('1970-01-01T13:00:00.000Z'),
    weekdays_id: mockCreateAvailabilityInput.weekdays[1],
  },
];

export const mockUpdateAvailabilityInput: UpdateAvailabilityDto = {
  business_id: mockedBusinessId,
  start_time: '06:00:00',
  end_time: '19:00:00',
  weekdays_id: '1',
};

export const mockUpdateAvailabilityArrayInput: UpdateAvailabilityDto = {
  business_id: mockedBusinessId,
  start_time: '06:00:00',
  end_time: '19:00:00',
  weekdays: ['1', '2'],
};

export const mockUpdateAvailabilityReturnService: Availability = {
  ...mockCreateAvailabilityReturnService,
  ...mockUpdateAvailabilityInput,
};

export const mockUpdateByBusinessWeekDayReturnService: Availability = {
  ...mockCreateAvailabilityReturnService,
  ...mockUpdateAvailabilityInput,
  start_time: new Date('1970-01-01T06:00:00.000Z'),
  end_time: new Date('1970-01-01T19:00:00.000Z'),
};
export const mockUpdateByBusinessReturnService: Availability = {
  ...mockCreateAvailabilityReturnService,
  ...mockUpdateAvailabilityInput,
};

export const mockUpdateByBusinessArrayReturnService: Availability[] = [
  {
    ...mockCreateAvailabilityReturnService,
    start_time: new Date('1970-01-01T12:00:00.000Z'),
    end_time: new Date('1970-01-01T13:00:00.000Z'),
    weekdays_id: mockCreateAvailabilityInput.weekdays[0],
  },
  {
    ...mockCreateAvailabilityReturnService,
    start_time: new Date('1970-01-01T12:00:00.000Z'),
    end_time: new Date('1970-01-01T13:00:00.000Z'),
    weekdays_id: mockCreateAvailabilityInput.weekdays[1],
  },
];

export const mockCreateAvailabilityReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.CREATED)
  .setHeaders({
    Location: `/availability/business/${mockedBusinessId}`,
  })
  .setBody(mockCreateAvailabilityReturnService)
  .build();

export const mockFindAllAvailabilityReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody([mockCreateAvailabilityReturnService])
  .build();

export const mockFindOneAvailabilityReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockCreateAvailabilityReturnService)
  .build();

export const mockUpdateAvailabilityReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setHeaders({ Location: `/availability/${mockedAvailabilityId}` })
  .setBody(mockUpdateAvailabilityReturnService)
  .build();

export const mockUpdateAvailabilityByBusinessReturnController =
  new NestResponseBuilder()
    .setStatus(HttpStatus.OK)
    .setHeaders({
      Location: `/availability/business/${mockedBusinessId}`,
    })
    .setBody(mockUpdateAvailabilityReturnService)
    .build();

export const mockRemoveAvailabilityReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockCreateAvailabilityReturnService)
  .build();

/*

export const mockUpdateAddressReturnService: Address = {
  ...mockCreateAddressReturnService,
  ...mockUpdateAddressInput,
};

export const mockRemoveAddressReturnService: Address = {
  ...mockCreateAddressReturnService,
};



  export const mockFindAddressReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody([mockCreateAddressReturnService])
  .build();

  export const mockFindOneAddressReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockCreateAddressReturnService)
  .build();

  */
