import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateBusinessDto } from '../dto/create-business.dto';
import { Business } from '../entities/business.entity';
import { IBusinessRepository } from './i-business-repository';
import { UpdateBusinessDto } from '../dto/update-business.dto';

@Injectable()
export class BusinessRepository implements IBusinessRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    name,
    description,
    address,
    category_id,
    image_url,
    owner_id,
    telephone,
  }: CreateBusinessDto): Promise<Business> {
    const newBusiness = await this.prismaService.business.create({
      data: {
        name,
        is_operating: true,
        description,
        address_id: address.id,
        category_id,
        image_url,
        owner_id,
        telephone,
      },
    });
    return newBusiness;
  }

  async findAll(): Promise<Business[]> {
    const allBusiness = await this.prismaService.business.findMany({
      where: {},
    });

    return allBusiness;
  }

  async findById(id: string): Promise<Business> {
    const businessFound = await this.prismaService.business.findFirst({
      where: { id },
    });

    return businessFound;
  }

  async findByTel(telephone: string): Promise<Business> {
    const businessFound = await this.prismaService.business.findFirst({
      where: { telephone },
    });

    return businessFound;
  }

  async findByOwner(owner_id: string): Promise<Business[]> {
    const businessFound = await this.prismaService.business.findMany({
      where: { owner_id },
    });

    return businessFound;
  }

  async updateById(
    id: string,
    {
      name,
      description,
      address,
      category_id,
      image_url,
      owner_id,
      telephone,
    }: UpdateBusinessDto,
  ): Promise<Business> {
    const updatedUser = await this.prismaService.business.update({
      where: { id },
      data: {
        name,
        is_operating: true,
        description,
        address_id: address.id,
        category_id,
        image_url,
        owner_id,
        telephone,
      },
    });

    return updatedUser;
  }

  async softDelete(id: string): Promise<Business> {
    const deletedBusiness = await this.prismaService.business.update({
      where: { id },
      data: { is_operating: false },
    });

    return deletedBusiness;
  }
}
