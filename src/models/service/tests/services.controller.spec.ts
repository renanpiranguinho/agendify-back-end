import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from '../services.controller';
import { ServicesService } from '../services.service';
import { JwtService } from '@nestjs/jwt';
import {
  findByBusinessServiceReturnController,
  mockCreateServiceInput,
  mockCreateServiceReturnController,
  mockCreateServiceReturnService,
  mockFindAllServiceReturnController,
  mockFindOneServiceReturnController,
  mockImageService,
  mockRemoveServiceReturnService,
  mockRemoveServiceReturnServiceController,
  mockUpdateServiceInput,
  mockUpdateServiceReturnService,
  mockUpdateServiceReturnServiceController,
  mockUploadImageServiceReturnController,
  mockedServiceId,
} from './mocks';
import { mockUser } from '../../../auth/tests/mocks';
import { mockedBusinessId } from '../../../models/business/tests/mocks';

describe('BusinessController', () => {
  let serviceController: ServicesController;
  let service: ServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [
        {
          provide: ServicesService,
          useValue: {
            create: jest.fn().mockReturnValue(mockCreateServiceReturnService),
            findAll: jest
              .fn()
              .mockReturnValue([mockCreateServiceReturnService]),
            findByBusiness: jest
              .fn()
              .mockReturnValue([mockCreateServiceReturnService]),
            findById: jest.fn().mockReturnValue(mockCreateServiceReturnService),
            update: jest.fn().mockReturnValue(mockUpdateServiceReturnService),
            remove: jest.fn().mockReturnValue(mockRemoveServiceReturnService),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    serviceController = module.get<ServicesController>(ServicesController);
    service = module.get<ServicesService>(ServicesService);
  });

  it('should be defined', () => {
    expect(serviceController).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a service', async () => {
      const result = await serviceController.create(
        mockCreateServiceInput.image_url,
        mockCreateServiceInput,
        mockUser,
      );

      expect(result).toEqual(mockCreateServiceReturnController);
    });

    it('shouuld be create a service throw an error', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      await expect(
        serviceController.create(
          mockCreateServiceInput.image_url,
          mockCreateServiceInput,
          mockUser,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return all services', async () => {
      const result = await serviceController.findAll();

      expect(result).toEqual(mockFindAllServiceReturnController);
    });

    it('shouuld be return all services throw an error', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

      await expect(serviceController.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return service by id', async () => {
      const result = await serviceController.findOne(mockedServiceId);

      expect(result).toEqual(mockFindOneServiceReturnController);
    });

    it('shouuld be return service by id throw an error', async () => {
      jest.spyOn(service, 'findById').mockRejectedValueOnce(new Error());

      await expect(
        serviceController.findOne(mockedServiceId),
      ).rejects.toThrowError();
    });
  });

  describe('findByBusiness', () => {
    it('should return service by business id', async () => {
      const result = await serviceController.findByBusiness(mockedBusinessId);

      expect(result).toEqual(findByBusinessServiceReturnController);
    });

    it('shouuld be return service by business id throw an error', async () => {
      jest.spyOn(service, 'findByBusiness').mockRejectedValueOnce(new Error());

      await expect(
        serviceController.findByBusiness(mockedBusinessId),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a service', async () => {
      const result = await serviceController.update(
        mockedServiceId,
        mockUpdateServiceInput,
        mockUser,
      );

      expect(result).toEqual(mockUpdateServiceReturnServiceController);
    });

    it('shouuld be update a service throw an error', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      await expect(
        serviceController.update(
          mockedServiceId,
          mockUpdateServiceInput,
          mockUser,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a service', async () => {
      const result = await serviceController.remove(mockedServiceId, mockUser);

      expect(result).toEqual(mockRemoveServiceReturnServiceController);
    });

    it('shouuld be remove a service throw an error', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());

      await expect(
        serviceController.remove(mockedServiceId, mockUser),
      ).rejects.toThrowError();
    });
  });

  describe('uploadImage', () => {
    it('should upload image', async () => {
      const result = await serviceController.uploadImage(
        mockedServiceId,
        mockImageService,
        mockUser,
      );

      expect(result).toEqual(mockUploadImageServiceReturnController);
    });

    it('shouuld be upload image throw an error', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      await expect(
        serviceController.uploadImage(
          mockedServiceId,
          mockImageService,
          mockUser,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('seeUploadedFile', () => {
    it('should see a business image', async () => {
      const mockResponse = {
        sendFile: jest.fn(),
      };

      await serviceController.seeUploadedFile(mockImageService, mockResponse);

      expect(mockResponse.sendFile).toHaveBeenCalledWith(mockImageService, {
        root: './src/uploads/services',
      });
      expect(mockResponse.sendFile).toHaveBeenCalledTimes(1);
    });
  });
});
