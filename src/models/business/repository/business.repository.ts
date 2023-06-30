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
        address_id: address ? address.id : null,
        category_id,
        image_url,
        owner_id,
        telephone,
      },
    });
    return newBusiness;
  }

  async findAll(
    businessName?: string,
    categoryId?: string,
  ): Promise<Business[]> {
    const whereCondition: {
      name?: {
        contains: string;
      };
      category_id?: string;
      is_operating: boolean;
    } = {
      is_operating: true,
    };

    if (businessName) {
      whereCondition.name = {
        contains: businessName,
      };
    }

    if (categoryId) {
      whereCondition.category_id = categoryId;
    }

    const allBusiness = await this.prismaService.business.findMany({
      where: whereCondition,
    });

    return allBusiness;
  }

  async findById(id: string): Promise<Business> {
    const businessFound = await this.prismaService.business.findFirst({
      where: { id, is_operating: true },
      include: { address: true },
    });

    return businessFound;
  }

  async findByTel(telephone: string): Promise<Business> {
    const businessFound = await this.prismaService.business.findFirst({
      where: { telephone, is_operating: true },
    });

    return businessFound;
  }

  async findByOwner(owner_id: string): Promise<Business[]> {
    const businessFound = await this.prismaService.business.findMany({
      where: { owner_id, is_operating: true },
    });

    return businessFound;
  }

  async updateById(
    id: string,
    {
      name,
      description,
      category_id,
      owner_id,
      telephone,
    }: UpdateBusinessDto,
  ): Promise<Business> {
    const updatedBusiness = await this.prismaService.business.update({
      where: { id },
      data: {
        name,
        is_operating: true,
        description,
        category_id,
        owner_id,
        telephone,
      },
    });

    return updatedBusiness;
  }

  async softDelete(id: string): Promise<Business> {
    const deletedBusiness = await this.prismaService.business.update({
      where: { id },
      data: { deleted_at: new Date(), is_operating: false },
    });

    return deletedBusiness;
  }
}
