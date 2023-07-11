import { PrismaService } from 'prisma/prisma.service';
import { CreateSchedulingDto } from '../dto/create-scheduling.dto';
import { Scheduling } from '../entities/scheduling.entity';
import { ISchedulingRepository } from './i-scheduling.repository';
import { UpdateSchedulingDto } from '../dto/update-scheduling.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SchedulingRepository implements ISchedulingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSchedulingDto: CreateSchedulingDto): Promise<Scheduling> {
    const scheduling = await this.prismaService.scheduling.create({
      data: { ...createSchedulingDto },
    });

    return scheduling;
  }

  async findOne(id: string): Promise<Scheduling> {
    const scheduling = await this.prismaService.scheduling.findFirst({
      where: { id },
    });

    return scheduling;
  }

  async findMySchedules(
    user_id: string,
    service_id: string,
    start_datetime: Date,
    end_datetime: Date,
  ): Promise<Scheduling[]> {
    const where = {};
    where['user_id'] = user_id ?? undefined;
    where['service_id'] = service_id ?? undefined;
    where['start_datetime'] = start_datetime ?? undefined;
    where['end_datetime'] = end_datetime ?? undefined;

    const mySchedules = await this.prismaService.scheduling.findMany({
      where,
    });

    return mySchedules;
  }

  async findSchedulesByBusinessId(
    user_id: string,
    business_id: string,
    day: string,
    month: string,
    year: string,
  ): Promise<Scheduling[]> {
    let date = null;
    if (day && month && year) {
      date = new Date(`${year}-${month}-${day}`);
    }
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const where = {};

    where['Service'] = {
      business_id: business_id,
    };

    if (date) {
      where['start_datetime'] = {
        gte: startOfDay,
      };
      where['end_datetime'] = {
        lte: endOfDay,
      };
    }

    const schedules = await this.prismaService.scheduling.findMany({
      where,
    });

    return schedules;
  }

  async findAll(): Promise<Scheduling[]> {
    const allSchedules = await this.prismaService.scheduling.findMany();

    return allSchedules;
  }

  async update(
    id: string,
    { start_datetime, end_datetime, service_id, user_id }: UpdateSchedulingDto,
  ): Promise<Scheduling> {
    const updatedRating = await this.prismaService.scheduling.update({
      where: { id },
      data: { start_datetime, end_datetime, service_id, user_id },
    });

    return updatedRating;
  }

  async delete(id: string): Promise<Scheduling> {
    const deletedRating = await this.prismaService.scheduling.delete({
      where: { id },
    });

    return deletedRating;
  }
}
