import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { Service } from '../entities/service.entity';

export interface IServiceRepository {
  create(createServiceDto: CreateServiceDto): Promise<Service>;
  findById(id: string): Promise<Service>;
  findAll(): Promise<Service[]>;
  updateById(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service>;
  delete(id: string): Promise<Service>;
}
