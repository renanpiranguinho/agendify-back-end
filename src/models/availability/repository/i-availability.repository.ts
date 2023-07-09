import { Availability } from '../entities/availability.entity';
import { UpdateAvailabilityDto } from '../dto/update-availability.dto';
import { CreateAvailabilityDto } from '../dto/create-availability.dto';

export interface IAvailabilityRepository {
  create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability>;
  findOne(id: string): Promise<Availability>;
  findAvailabilityByBusiness(businessId: string): Promise<Availability[]>;
  findAll(): Promise<Availability[]>;
  update(id: string, updateAvailabilityDto: UpdateAvailabilityDto): Promise<Availability>;
  delete(id: string): Promise<Availability>;
}
