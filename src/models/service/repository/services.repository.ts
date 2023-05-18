import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { Service } from '../entities/service.entity';
import { IServiceRepository } from './i-service-repository';
import { UpdateServiceDto } from '../dto/update-service.dto';

@Injectable()
export class ServicesRepository implements IServiceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    name,
    description,
    image_url,
    duration,
    price,
    business_id,
  }: CreateServiceDto): Promise<Service> {
    const newService = await this.prismaService.service.create({
      data: {
        name,
        description,
        image_url,
        duration,
        price,
        business_id,
      },
    });
    return newService;
  }

  async findAll(): Promise<Service[]> {
    const allServices = await this.prismaService.service.findMany({
      where: {},
    });

    return allServices;
  }

  async findById(id: string): Promise<Service> {
    const serviceFound = await this.prismaService.service.findFirst({
      where: { id },
    });

    return serviceFound;
  }

  async updateById(
    id: string,
    {
      name,
      description,
      image_url,
      duration,
      price,
      business_id,
    }: UpdateServiceDto,
  ): Promise<Service> {
    const updatedService = await this.prismaService.service.update({
      where: { id },
      data: {
        name,
        description,
        image_url,
        duration,
        price,
        business_id,
      },
    });

    return updatedService;
  }

  async delete(id: string): Promise<Service> {
    const deletedService = await this.prismaService.service.delete({
      where: { id },
    });

    return deletedService;
  }
}
