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
    const newBusiness = await this.prismaService.service.create({
      data: {
        name,
        description,
        image_url,
        duration,
        price,
        business_id,
      },
    });
    return newBusiness;
  }

  async findAll(): Promise<Service[]> {
    const allBusiness = await this.prismaService.service.findMany({
      where: {},
    });

    return allBusiness;
  }

  async findById(id: string): Promise<Service> {
    const businessFound = await this.prismaService.service.findFirst({
      where: { id },
    });

    return businessFound;
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
    const updatedUser = await this.prismaService.service.update({
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

    return updatedUser;
  }

  async delete(id: string): Promise<Service> {
    const deletedService = await this.prismaService.service.delete({
      where: { id },
    });

    return deletedService;
  }
}
