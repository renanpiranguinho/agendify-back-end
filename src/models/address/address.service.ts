import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdressDto } from './dto/create-address.dto';
import { Address } from './entities/address.entity';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './repository/address.repository';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async create(
    { postal_code, city, district, number, state, street }: CreateAdressDto,
    owner_id: string,
  ): Promise<Address> {
    const newAddress = await this.addressRepository.create({
      postal_code,
      city,
      district,
      number,
      state,
      street,
      owner_id,
    });

    return new Address(newAddress);
  }

  async findMine(owner_id): Promise<Address[]> {
    const allAddress = await this.addressRepository.findMine(owner_id);

    return allAddress.map((address) => new Address(address));
  }

  async findById(id: string): Promise<Address> {
    const address = await this.addressRepository.findById(id);

    if (!address) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Address not found',
      });
    }

    return new Address(address);
  }

  async update(
    id: string,
    { postal_code, city, district, number, state, street }: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.addressRepository.findById(id);

    if (!address) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Address not found',
      });
    }

    const updatedAddress = await this.addressRepository.updateById(id, {
      postal_code,
      city,
      district,
      number,
      state,
      street,
    });

    return new Address(updatedAddress);
  }

  async remove(id: string): Promise<Address> {
    try {
      const deletedAddress = await this.addressRepository.delete(id);

      return new Address(deletedAddress);
    } catch (error) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Address not found',
      });
    }
  }
}
