import { PrismaService } from 'prisma/prisma.service';
import { CreateSchedulingDto } from '../dto/create-scheduling.dto';
import { Scheduling } from '../entities/scheduling.entity';
import { ISchedulingRepository } from './i-scheduling.repository';
import { UpdateSchedulingDto } from '../dto/update-scheduling.dto';
import { Injectable } from '@nestjs/common';
import moment from 'moment';

@Injectable()
export class SchedulingRepository implements ISchedulingRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async create( createSchedulingDto: CreateSchedulingDto): Promise<Scheduling> {
    const scheduling = await this.prismaService.scheduling.create({
      data: { ...createSchedulingDto  },
    });

    return scheduling;
  }

  async findOne(id: string): Promise<Scheduling> {
    const scheduling = await this.prismaService.scheduling.findFirst({
      where: { id },
    });

    return scheduling;
  }

  async findMySchedules(user_id: string, service_id: string, datetime: string): Promise<Scheduling[]> {

    const where = {}
    where['user_id'] = user_id ?? undefined
    where['service_id'] = service_id ?? undefined
    where['datetime'] = datetime ? new Date(datetime).toISOString() : undefined


    const mySchedules = await this.prismaService.scheduling.findMany({ where });

    return mySchedules;
  }
  
  async findAll(): Promise<Scheduling[]> {
    const allSchedules = await this.prismaService.scheduling.findMany();

    return allSchedules;
  }

  async update( id: string, { datetime }: UpdateSchedulingDto): Promise<Scheduling> {
    const updatedRating = await this.prismaService.scheduling.update({
      where: { id },
      data: { datetime },
    });

    return updatedRating;
  }

  async delete(id: string): Promise<Scheduling> {
    const deletedRating = await this.prismaService.scheduling.delete({ where: { id } });

    return deletedRating;
  }
}
