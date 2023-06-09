import { Availability } from '../entities/availability.entity';
import { IAvailabilityRepository } from './i-availability.repository';
import { UpdateAvailabilityDto } from '../dto/update-availability.dto';
import { Injectable } from '@nestjs/common';
import { CreateAvailabilityDto } from '../dto/create-availability.dto';
import { PrismaService } from '../../../../prisma/prisma.service';
import { getDateTimeFromString } from '../../../utils/format-data';

@Injectable()
export class AvailabilityRepository implements IAvailabilityRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    start_time,
    end_time,
    weekdays,
    ...createAvailabilityDto
  }: CreateAvailabilityDto): Promise<Availability> {
    const availability = await this.prismaService.availability.create({
      data: {
        start_time: getDateTimeFromString(start_time),
        end_time: getDateTimeFromString(end_time),
        ...createAvailabilityDto,
      },
    });

    return availability;
  }

  async findOne(id: string): Promise<Availability> {
    const availability = await this.prismaService.availability.findFirst({
      where: { id },
    });

    return availability;
  }

  async findAvailabilityByBusiness(
    businessId: string,
  ): Promise<Availability[]> {
    const availabilitiesByBusiness =
      await this.prismaService.availability.findMany({
        where: {
          business_id: businessId,
        },
      });

    return availabilitiesByBusiness;
  }

  async findAll(): Promise<Availability[]> {
    const allAvailabilities = await this.prismaService.availability.findMany();

    return allAvailabilities;
  }

  async update(
    id: string,
    { start_time, end_time, weekdays_id }: UpdateAvailabilityDto,
  ): Promise<Availability> {
    const updatedAvailability = await this.prismaService.availability.update({
      where: { id },
      data: {
        start_time: getDateTimeFromString(start_time),
        end_time: getDateTimeFromString(end_time),
        weekdays_id,
      },
    });

    return updatedAvailability;
  }

  async updateByBusinessWeekDay(
    business_id,
    { start_time, end_time, weekdays_id }: UpdateAvailabilityDto,
  ): Promise<Availability> {
    const updatedAvailability = await this.prismaService.availability.upsert({
      where: {
        business_id_weekdays_id: {
          business_id: business_id,
          weekdays_id: weekdays_id,
        },
      },
      create: {
        start_time: getDateTimeFromString(start_time),
        end_time: getDateTimeFromString(end_time),
        business_id: business_id,
        weekdays_id: weekdays_id,
      },
      update: {
        start_time: getDateTimeFromString(start_time),
        end_time: getDateTimeFromString(end_time),
      },
    });

    return updatedAvailability;
  }

  async delete(id: string): Promise<Availability> {
    const deletedAvailability = await this.prismaService.availability.delete({
      where: { id },
    });

    return deletedAvailability;
  }
}
