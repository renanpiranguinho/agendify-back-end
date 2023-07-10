import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSchedulingDto } from './dto/create-scheduling.dto';
import { UpdateSchedulingDto } from './dto/update-scheduling.dto';
import { SchedulingRepository } from './repository/scheduling.repository';
import { Scheduling } from './entities/scheduling.entity';

@Injectable()
export class SchedulingService {
  constructor(private readonly schedulingRepository: SchedulingRepository) {}

  async create(createSchedulingDto: CreateSchedulingDto, userId: string) {
    createSchedulingDto.user_id = userId;

    try {
      createSchedulingDto.datetime = new Date(createSchedulingDto.datetime);
    } catch (error) {
      throw new BadRequestException({
        message: 'Invalid date format.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    if (createSchedulingDto.datetime < new Date()) {
      throw new BadRequestException({
        message: 'You cannot schedule in the past.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const scheduleExists = await this.schedulingRepository.findMySchedules(
      null,
      createSchedulingDto.service_id,
      createSchedulingDto.datetime,
    );

    if (!scheduleExists) {
      throw new BadRequestException({
        message: 'This schedule has already been booked.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const schedule = await this.schedulingRepository.create(
      createSchedulingDto,
    );

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

  async findMySchedules(user_id: string, service_id: string, datetime: Date) {
    const mySchedules = await this.schedulingRepository.findMySchedules(
      user_id,
      service_id,
      datetime,
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

  async update(id: string, updateRatingDto: UpdateSchedulingDto) {
    const scheduleExists = await this.schedulingRepository.findOne(id);
    if (!scheduleExists) {
      throw new BadRequestException({
        message: 'Schedule not found.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const scheduleAllowed = await this.schedulingRepository.findMySchedules(
      null,
      updateRatingDto.service_id,
      updateRatingDto.datetime,
    );
    if (!scheduleAllowed) {
      throw new BadRequestException({
        message: 'This schedule has already been booked.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const updatedSchedule = await this.schedulingRepository.update(
      id,
      updateRatingDto,
    );

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
