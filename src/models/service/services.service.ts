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
import { PrismaService } from 'prisma/prisma.service';
import { UsersRepository } from '../users/repository/user.repository';
import { BusinessRepository } from '../business/repository/business.repository';

@Injectable()
export class ServicesService {
  constructor(
    private readonly businessRepository: BusinessRepository,
    private readonly serviceRepository: ServicesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly prismaService: PrismaService,
  ) {}
  async create({
    name,
    description,
    image_url,
    business_id,
    duration,
    price,
  }: CreateServiceDto) {
    const business = await this.businessRepository.findById(business_id);
    if (!business) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Business not found',
      });
    }
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
  ): Promise<Service> {
    const service = await this.serviceRepository.findById(id);

    if (!service) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Service not found',
      });
    }

    if (business_id) {
      const business = await this.businessRepository.findById(id);

      if (!business) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Business not found',
        });
      }
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

  async remove(id: string) {
    try {
      const serviceFound = await this.serviceRepository.findById(id);

      if (!serviceFound)
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Service not found',
        });

      const serviceDeleted = await this.serviceRepository.delete(id);
      return new Service(serviceDeleted);
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Service not deleted',
        error: error,
      });
    }
  }
}
