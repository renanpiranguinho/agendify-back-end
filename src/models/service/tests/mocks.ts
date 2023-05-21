import { mockedBusinessId } from '../../../models/business/tests/mocks';
import { Service } from '../entities/service.entity';

const mockedIdService = '273a028c-7e02-4c6b-a492-14a10245f5cd';

export const mockCreateServiceReturnService: Service = {
  id: mockedIdService,
  name: 'Mocked Service',
  description: 'This is a mocked service',
  image_url: 'mocked-image-url',
  duration: '01:00:00',
  price: 100,
  business_id: mockedBusinessId,
  created_at: new Date(),
  updated_at: new Date(),
};

export const mockUpdateServiceReturnService: Service = {
  ...mockCreateServiceReturnService,
  name: 'Mocked Service Updated',
};

export const mockRemoveServiceReturnService: Service = {
  ...mockCreateServiceReturnService,
};
