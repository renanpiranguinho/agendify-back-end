import { NestResponseBuilder } from '../../../core/http/nestResponseBuilder';
import { HttpStatus } from '@nestjs/common';
import { mockedBusinessId } from '../../../models/business/tests/mocks';
import { Service } from '../entities/service.entity';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';

export const mockedServiceId = '273a028c-7e02-4c6b-a492-14a10245f5cd';

export const mockCreateServiceInput: CreateServiceDto = {
  name: 'Mocked Service',
  description: 'This is a mocked service',
  image_url: 'mocked-image-url',
  duration: '01:00:00',
  price: 100,
  business_id: mockedBusinessId,
};

export const mockUpdateServiceInput: UpdateServiceDto = {
  name: 'Mocked Service Updated',
  description: 'This is a mocked service updated',
};

export const mockCreateServiceReturnService: Service = {
  ...mockCreateServiceInput,
  id: mockedServiceId,
  created_at: new Date(),
  updated_at: new Date(),
};

export const mockUpdateServiceReturnService: Service = {
  ...mockCreateServiceReturnService,
  ...mockUpdateServiceInput,
};

export const mockRemoveServiceReturnService: Service = {
  ...mockCreateServiceReturnService,
};

export const mockCreateServiceReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.CREATED)
  .setHeaders({ Location: `/business/${mockedServiceId}` })
  .setBody(mockCreateServiceReturnService)
  .build();

export const mockFindAllServiceReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody([mockCreateServiceReturnService])
  .build();

export const mockFindOneServiceReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody(mockCreateServiceReturnService)
  .build();

export const findByBusinessServiceReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody([mockCreateServiceReturnService])
  .build();

export const mockUpdateServiceReturnServiceController =
  new NestResponseBuilder()
    .setStatus(HttpStatus.OK)
    .setHeaders({ Location: `/business/${mockedServiceId}` })
    .setBody(mockUpdateServiceReturnService)
    .build();

export const mockRemoveServiceReturnServiceController =
  new NestResponseBuilder()
    .setStatus(HttpStatus.OK)
    .setBody(mockRemoveServiceReturnService)
    .build();

export const mockImageService = {
  originalname: 'originalname',
  filename: 'filename',
  destination: 'services/img/filename',
};

export const mockUploadImageServiceReturnController = new NestResponseBuilder()
  .setStatus(HttpStatus.OK)
  .setBody({
    originalname: mockImageService.originalname,
    filename: mockImageService.filename,
    destination: mockImageService.destination,
  })
  .build();
