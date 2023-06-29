import { CreateAdressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { Address } from '../entities/address.entity';

export interface IAddressRepository {
  create(createAddressDto: CreateAdressDto): Promise<Address>;
  findById(id: string): Promise<Address>;
  findMine(owner_id: string): Promise<Address[]>;
  updateById(id: string, updateAddressDto: UpdateAddressDto): Promise<Address>;
  delete(id: string): Promise<Address>;
}
