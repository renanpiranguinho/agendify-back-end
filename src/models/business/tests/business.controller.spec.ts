import { Test, TestingModule } from '@nestjs/testing';
import { BusinessController } from '../business.controller';
import { BusinessService } from '../business.service';
import { JwtService } from '@nestjs/jwt';
import {
  mockCreateBusinessInput,
  mockCreateBusinessReturnController,
  mockCreateBusinessReturnService,
  mockFindAllBusinessReturnController,
  mockFindOneBusinessReturnController,
  mockImageBusiness,
  mockRemoveBusinessReturnService,
  mockUpdateBusinessInput,
  mockUpdateBusinessReturnController,
  mockUpdateBusinessReturnService,
  mockUploadBusinessImageReturnController,
  mockedBusinessId,
} from './mocks';
import { mockUser } from '../../../auth/tests/mocks';

describe('BusinessController', () => {
  let businesscontroller: BusinessController;
  let businessService: BusinessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessController],
      providers: [
        {
          provide: BusinessService,
          useValue: {
            create: jest.fn().mockReturnValue(mockCreateBusinessReturnService),
            findAll: jest
              .fn()
              .mockReturnValue([mockCreateBusinessReturnService]),
            findById: jest
              .fn()
              .mockReturnValue(mockCreateBusinessReturnService),
            findByOwner: jest
              .fn()
              .mockReturnValue([mockCreateBusinessReturnService]),
            update: jest.fn().mockReturnValue(mockUpdateBusinessReturnService),
            remove: jest.fn().mockReturnValue(mockRemoveBusinessReturnService),
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

    businesscontroller = module.get<BusinessController>(BusinessController);
    businessService = module.get<BusinessService>(BusinessService);
  });

  it('should be defined', () => {
    expect(businesscontroller).toBeDefined();
    expect(businessService).toBeDefined();
  });

  describe('create', () => {
    it('should create a business', async () => {
      const business = await businesscontroller.create(
        'mocked-image-url',
        mockCreateBusinessInput,
        mockUser,
      );

      expect(business).toEqual(mockCreateBusinessReturnController);
    });

    it('should be create a business throw error', async () => {
      jest.spyOn(businessService, 'create').mockRejectedValueOnce(new Error());

      await expect(
        businesscontroller.create(
          'mocked-image-url',
          mockCreateBusinessInput,
          mockUser,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should find all businesses', async () => {
      const params = {
        business_name: '',
        category_id: '',
      };
      const businesses = await businesscontroller.findAll(params);

      expect(businesses).toEqual(mockFindAllBusinessReturnController);
    });

    it('should be find all businesses throw error', async () => {
      jest.spyOn(businessService, 'findAll').mockRejectedValueOnce(new Error());

      await expect(
        businesscontroller.findAll(undefined),
      ).rejects.toThrowError();
    });
  });

  describe('findMe', () => {
    it('should find my businesses', async () => {
      const businesses = await businesscontroller.findMe(mockUser);

      expect(businesses).toEqual(mockFindAllBusinessReturnController);
    });

    it('should be find my businesses throw error', async () => {
      jest
        .spyOn(businessService, 'findByOwner')
        .mockRejectedValueOnce(new Error());

      await expect(businesscontroller.findMe(mockUser)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should find a business by id', async () => {
      const business = await businesscontroller.findOne(mockedBusinessId);

      expect(business).toEqual(mockFindOneBusinessReturnController);
    });

    it('should be find a business by id throw error', async () => {
      jest
        .spyOn(businessService, 'findById')
        .mockRejectedValueOnce(new Error());

      await expect(
        businesscontroller.findOne(mockedBusinessId),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a business', async () => {
      const business = await businesscontroller.update(
        mockedBusinessId,
        mockUpdateBusinessInput,
        mockUser,
      );

      expect(business).toEqual(mockUpdateBusinessReturnController);
    });

    it('should be update a business throw error', async () => {
      jest.spyOn(businessService, 'update').mockRejectedValueOnce(new Error());

      await expect(
        businesscontroller.update(
          mockedBusinessId,
          mockCreateBusinessInput,
          mockUser,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a business', async () => {
      const business = await businesscontroller.remove(
        mockedBusinessId,
        mockUser,
      );

      expect(business).toEqual(mockRemoveBusinessReturnService);
    });

    it('should be remove a business throw error', async () => {
      jest.spyOn(businessService, 'remove').mockRejectedValueOnce(new Error());

      await expect(
        businesscontroller.remove(mockedBusinessId, mockUser),
      ).rejects.toThrowError();
    });
  });

  describe('uploadImage', () => {
    it('should upload a business image', async () => {
      const business = await businesscontroller.uploadImage(
        mockedBusinessId,
        mockImageBusiness,
        mockUser,
      );

      expect(business).toEqual(mockUploadBusinessImageReturnController);
    });

    it('should be upload a business image throw error', async () => {
      jest.spyOn(businessService, 'update').mockRejectedValueOnce(new Error());

      await expect(
        businesscontroller.uploadImage(
          mockedBusinessId,
          mockImageBusiness,
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

      await businesscontroller.seeUploadedFile(mockImageBusiness, mockResponse);

      expect(mockResponse.sendFile).toHaveBeenCalledWith(mockImageBusiness, {
        root: './src/uploads/business',
      });

      expect(mockResponse.sendFile).toHaveBeenCalledTimes(1);
    });
  });
});
