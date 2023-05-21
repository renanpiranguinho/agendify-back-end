import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesRepository } from './repository/services.repository';
import { Service } from './entities/service.entity';
import { UsersRepository } from '../users/repository/user.repository';
import { BusinessRepository } from '../business/repository/business.repository';
import { Business } from '../business/entities/business.entity';

@Injectable()
export class ServicesService {
  constructor(
    private readonly businessRepository: BusinessRepository,
    private readonly serviceRepository: ServicesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}
  async create(
    {
      name,
      description,
      image_url,
      business_id,
      duration,
      price,
    }: CreateServiceDto,
    owner_id: string,
  ) {
    const business = await this.businessRepository.findById(business_id);
    if (!business) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Business not found',
      });
    }

    const ownerExists = await this.usersRepository.findById(owner_id);

    if (!ownerExists) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business Owner is not found',
      });
    }

    const userBusiness: Business[] = await this.businessRepository.findByOwner(
      owner_id,
    );

    const belongUser = userBusiness.some(
      (usrBusiness) => usrBusiness.id == business.id,
    );

    if (!belongUser) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business not belong user',
      });
    }

    if (price) price = parseFloat(price.toString());

    const newBusiness = await this.serviceRepository.create({
      name,
      description,
      image_url,
      business_id,
      duration,
      price,
    });

    return new Service(newBusiness);
  }

  async findAll(): Promise<Service[]> {
    const allServices = await this.serviceRepository.findAll();

    return allServices.map((service) => new Service(service));
  }

  async findById(id: string): Promise<Service> {
    const service = await this.serviceRepository.findById(id);

    if (!service) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Service not found',
      });
    }

    return new Service(service);
  }

  async findByBusiness(business_id: string): Promise<Service[]> {
    const business = await this.businessRepository.findById(business_id);
    if (!business) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Business not found',
      });
    }

    const allServices = await this.serviceRepository.findByBusiness(business_id);

    if (allServices.length == 0) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Services not found',
      });
    }

    return allServices.map((service) => new Service(service));
  }

  async update(
    id: string,
    {
      name,
      description,
      image_url,
      business_id,
      duration,
      price,
    }: UpdateServiceDto,
    owner_id: string,
  ): Promise<Service> {
    const service = await this.serviceRepository.findById(id);

    if (!service) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Service not found',
      });
    }

    if (business_id) {
      const business = await this.businessRepository.findById(business_id);

      if (!business) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Business not found',
        });
      }
    }

    const ownerExists = await this.usersRepository.findById(owner_id);

    if (!ownerExists) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business Owner is not found',
      });
    }

    const serviceBusinessId = service.business_id;

    const userBusiness: Business[] = await this.businessRepository.findByOwner(
      owner_id,
    );

    const belongUser = userBusiness.some(
      (usrBusiness) => usrBusiness.id == serviceBusinessId,
    );

    if (!belongUser) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business not belong user',
      });
    }

    const updatedService = await this.serviceRepository.updateById(id, {
      name,
      description,
      image_url,
      business_id,
      duration,
      price,
    });

    return new Service(updatedService);
  }

  async remove(id: string, owner_id: string) {
    const serviceFound = await this.serviceRepository.findById(id);

    if (!serviceFound)
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Service not found',
      });

    const ownerExists = await this.usersRepository.findById(owner_id);

    if (!ownerExists) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business Owner is not found',
      });
    }

    const serviceBusinessId = serviceFound.business_id;

    const userBusiness: Business[] = await this.businessRepository.findByOwner(
      owner_id,
    );

    const belongUser = userBusiness.some(
      (usrBusiness) => usrBusiness.id == serviceBusinessId,
    );

    if (!belongUser) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business not belong user',
      });
    }

    const serviceDeleted = await this.serviceRepository.delete(id);

    if (!serviceDeleted) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Service not deleted',
      });
    }

    return new Service(serviceDeleted);
  }
}
