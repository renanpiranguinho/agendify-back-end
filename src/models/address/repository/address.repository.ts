import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { Address } from '../entities/address.entity';
import { IAddressRepository } from './i-address-repository';
import { CreateAdressDto } from '../dto/create-address.dto';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    postal_code,
    city,
    district,
    number,
    state,
    street,
    owner_id,
  }: CreateAdressDto): Promise<Address> {
    const newAddress = await this.prismaService.address.create({
      data: {
        postal_code,
        city,
        district,
        number,
        state,
        street,
        owner_id,
      },
    });
    return newAddress;
  }

  async findById(id: string): Promise<Address> {
    const userFound = await this.prismaService.address.findFirst({
      where: { id },
    });

    return userFound;
  }

  async findMine(owner_id: string): Promise<Address[]> {
    const allAddress = await this.prismaService.address.findMany({
      where: { owner_id },
    });

    return allAddress;
  }

  async updateById(
    id: string,
    { postal_code, city, district, number, state, street }: UpdateAddressDto,
  ): Promise<Address> {
    const updatedAddress = await this.prismaService.address.update({
      where: { id },
      data: {
        postal_code,
        city,
        district,
        number,
        state,
        street,
      },
    });

    return updatedAddress;
  }

  async delete(id: string): Promise<Address> {
    const deletedAddress = await this.prismaService.address.delete({
      where: { id },
    });

    return deletedAddress;
  }
}
