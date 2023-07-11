import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSchedulingDto } from './dto/create-scheduling.dto';
import { UpdateSchedulingDto } from './dto/update-scheduling.dto';
import { SchedulingRepository } from './repository/scheduling.repository';
import { Scheduling } from './entities/scheduling.entity';
import { AvailabilityRepository } from '../availability/repository/availability.repository';
import { ServicesRepository } from '../service/repository/services.repository';

@Injectable()
export class SchedulingService {
  constructor(
    private readonly schedulingRepository: SchedulingRepository,
    private readonly availabilityRepository: AvailabilityRepository,
    private readonly servicesRepository: ServicesRepository,
  ) {}

  async create(
    {
      start_datetime,
      end_datetime,
      ...createSchedulingDto
    }: CreateSchedulingDto,
    userId: string,
  ) {
    createSchedulingDto.user_id = userId;

    const serviceExists = await this.servicesRepository.findById(
      createSchedulingDto.service_id,
    );

    if (!serviceExists) {
      throw new BadRequestException({
        message: 'Service not found.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const businessAvailable =
      await this.availabilityRepository.findAvailabilityByBusiness(
        serviceExists.business_id,
      );

    if (businessAvailable.length === 0) {
      throw new BadRequestException({
        message: 'This business has no availability.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const now = new Date();
    const startDateTime = new Date(start_datetime);
    const endDateTime = new Date(end_datetime);

    if (startDateTime < now) {
      throw new BadRequestException({
        message: 'You cannot schedule in the past.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    if (startDateTime > endDateTime) {
      throw new BadRequestException({
        message: 'The start date cannot be greater than the end date.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    startDateTime.setHours(startDateTime.getHours() - 3);
    endDateTime.setHours(endDateTime.getHours() - 3);

    const scheduleExists = await this.schedulingRepository.findMySchedules(
      null,
      createSchedulingDto.service_id,
      startDateTime,
      endDateTime,
    );

    if (scheduleExists.length > 0) {
      throw new BadRequestException({
        message: 'This schedule has already been booked.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const schedule = await this.schedulingRepository.create({
      start_datetime: startDateTime,
      end_datetime: endDateTime,
      ...createSchedulingDto,
    });

    if (!schedule) {
      throw new BadRequestException({
        message: 'Error creating schedule.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    return new Scheduling(schedule);
  }

  async findOne(id: string) {
    const schedule = await this.schedulingRepository.findOne(id);

    if (!schedule) {
      throw new BadRequestException({
        message: 'Schedule not found.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    return new Scheduling(schedule);
  }

  async findMySchedules(
    user_id: string,
    service_id: string,
    start_datetime: Date,
    end_datetime: Date,
  ) {
    const mySchedules = await this.schedulingRepository.findMySchedules(
      user_id,
      service_id,
      start_datetime,
      end_datetime,
    );

    if (!mySchedules) {
      throw new BadRequestException({
        message:
          'There are no appointments scheduled for the provided parameters.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    return mySchedules.map((schedule) => new Scheduling(schedule));
  }

  async findAll() {
    const allSchedules = await this.schedulingRepository.findAll();

    return allSchedules.map((schedule) => new Scheduling(schedule));
  }

  async findSchedulesByBusiness(
    user_id: string,
    business_id: string,
    day: string,
    month: string,
    year: string,
  ) {
    const schedules = await this.schedulingRepository.findSchedulesByBusinessId(
      user_id,
      business_id,
      day,
      month,
      year,
    );

    return schedules.map((schedule) => new Scheduling(schedule));
  }

  async update(
    id: string,
    { start_datetime, end_datetime, ...updateRatingDto }: UpdateSchedulingDto,
  ) {
    const scheduleExists = await this.schedulingRepository.findOne(id);
    if (!scheduleExists) {
      throw new BadRequestException({
        message: 'Schedule not found.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const now = new Date();
    const startDateTime = new Date(start_datetime);
    const endDateTime = new Date(end_datetime);

    if (startDateTime < now) {
      throw new BadRequestException({
        message: 'You cannot schedule in the past.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    if (startDateTime > endDateTime) {
      throw new BadRequestException({
        message: 'The start date cannot be greater than the end date.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    startDateTime.setHours(startDateTime.getHours() - 3);
    endDateTime.setHours(endDateTime.getHours() - 3);

    const scheduleAllowed = await this.schedulingRepository.findMySchedules(
      null,
      updateRatingDto?.service_id,
      startDateTime,
      endDateTime,
    );

    if (scheduleAllowed.length > 0) {
      throw new BadRequestException({
        message: 'This schedule has already been booked.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const updatedSchedule = await this.schedulingRepository.update(id, {
      start_datetime: startDateTime,
      end_datetime: endDateTime,
      ...updateRatingDto,
    });

    return new Scheduling(updatedSchedule);
  }

  async delete(id: string) {
    const scheduleExists = await this.schedulingRepository.findOne(id);

    if (!scheduleExists) {
      throw new BadRequestException({
        message: 'Schedule not found',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const deletedSchedule = await this.schedulingRepository.delete(id);

    return deletedSchedule;
  }
}
