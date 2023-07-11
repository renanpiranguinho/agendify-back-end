import { CreateSchedulingDto } from '../dto/create-scheduling.dto';
import { Scheduling } from '../entities/scheduling.entity';
import { UpdateSchedulingDto } from '../dto/update-scheduling.dto';

export interface ISchedulingRepository {
  create(createRatingDto: CreateSchedulingDto): Promise<any>;
  findOne(id: string): Promise<Scheduling>;
  findMySchedules(
    user_id: string,
    service_id: string,
    start_datetime: Date,
    end_datetime: Date,
  ): Promise<Scheduling[]>;
  findAll(): Promise<Scheduling[]>;
  update(
    id: string,
    UpdateSchedulingDto: UpdateSchedulingDto,
  ): Promise<Scheduling>;
  delete(id: string): Promise<Scheduling>;
}
