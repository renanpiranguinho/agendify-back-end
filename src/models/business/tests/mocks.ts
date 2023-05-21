import { CreateBusinessDto } from '../dto/create-business.dto';
import { Business } from '../entities/business.entity';
import { User } from '../../../models/users/entities/user.entity';
import { UpdateBusinessDto } from '../dto/update-business.dto';
import { Role } from '../../../models/users/enums/role.enum';
import { mockedUserId } from '../../../models/users/tests/mocks';
import { NestResponseBuilder } from '../../../core/http/nestResponseBuilder';
import { HttpStatus } from '@nestjs/common';

export const mockedBusinessId = '307171f1-7eef-449c-808c-a70f54b96139';
export const mockedAddressId = '7e875398-bd2a-4dd1-836c-0f83e038cf80';
export const mockedCategoryId = 'a3fb1297-8135-48a4-8b3d-3a82de375ddf';

export const mockCreateBusinessInput: CreateBusinessDto = {
  name: 'Mocked Business',
  description: 'This is a mocked business',
  address: {
    id: mockedAddressId,
    postal_code: '12345678',
    number: '123',
    street: 'Mocked Street',
    district: 'Mocked District',
    city: 'Mocked City',
    state: 'Mocked State',
  },
  image_url: 'mocked-image-url',
  telephone: '1234567890',
  owner_id: mockedUserId,
  category_id: mockedCategoryId,
};

export const mockCreateBusinessReturnService: Business = {
  id: mockedBusinessId,
  name: 'Mocked Business',
  description: 'This is a mocked business',
  address_id: mockedAddressId,
  is_operating: false,
  image_url: 'mocked-image-url',
  telephone: '1234567890',
  owner_id: mockedUserId,
  category_id: mockedCategoryId,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

export const mockUpdateBusinessInput: UpdateBusinessDto = {
  name: 'Mocked Business Updated',
  description: 'This is a mocked business updated',
};

export const mockUpdateBusinessReturnService: Business = {
  ...mockCreateBusinessReturnService,
  ...mockUpdateBusinessInput,
};

export const mockRemoveBusinessReturnService: Business = {
  ...mockCreateBusinessReturnService,
  deleted_at: new Date(),
};

export const mockUserCreatedBusiness: User = {
  id: mockedUserId,
  email: 'test@test.com',
  name: 'test',
  password: '123456',
  is_active: false,
  role: Role.PROVIDER,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

export const mockCategory = {
  id: mockedCategoryId,
  name: 'Mocked Category',
  created_at: new Date(),
  updated_at: new Date(),
};

export const mockCreateBusinessReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.CREATED)
  .setHeaders({
    Location: `/business/${mockedBusinessId}`,
  })
  .setBody(mockCreateBusinessReturnService)
  .build();

export const mockFindAllBusinessReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody([mockCreateBusinessReturnService])
  .build();

export const mockFindOneBusinessReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockCreateBusinessReturnService)
  .build();

export const mockUpdateBusinessReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setHeaders({ Location: `/business/${mockedBusinessId}` })
  .setBody(mockUpdateBusinessReturnService)
  .build();

export const mockImageBusiness = {
  originalname: 'originalname',
  filename: 'filename',
  destination: 'business/img/filename',
};

export const mockUploadBusinessImageReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody({
    originalname: mockImageBusiness.originalname,
    filename: mockImageBusiness.filename,
    destination: mockImageBusiness.destination,
  })
  .build();
