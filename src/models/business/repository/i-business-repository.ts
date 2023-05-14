import { CreateBusinessDto } from '../dto/create-business.dto';
import { UpdateBusinessDto } from '../dto/update-business.dto';
import { Business } from '../entities/business.entity';

export interface IBusinessRepository {
  create(createBusinessDto: CreateBusinessDto): Promise<Business>;
  findById(id: string): Promise<Business>;
  findByTel(telephone: string): Promise<Business>;
  findByOwner(owner_id: string): Promise<Business[]>;
  findAll(): Promise<Business[]>;
  updateById(
    id: string,
    updateBusinessDto: UpdateBusinessDto,
  ): Promise<Business>;
  softDelete(id: string): Promise<Business>;
}
