import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { UsersRepository } from '../users/repository/user.repository';
import { AvailabilityRepository } from './repository/availability.repository';
import { Availability } from './entities/availability.entity';
import { BusinessRepository } from '../business/repository/business.repository';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { Business } from '../business/entities/business.entity';
import { getStringFromDateTime } from 'src/utils/format-data';

@Injectable()
export class AvailabilityService {
  constructor(
    private readonly availabilityRepository: AvailabilityRepository,
    private readonly userRepository: UsersRepository,
    private readonly businessRepository: BusinessRepository,
  ) {}

  async create(
    { business_id, ...createAvailabilityDto }: CreateAvailabilityDto,
    user_id: string,
  ) {
    const userExists = await this.userRepository.findById(user_id);

    if (!userExists) {
      throw new BadRequestException({
        message: 'User does not exist',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const business = await this.businessRepository.findById(business_id);
    if (!business) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Business not found',
      });
    }

    const userBusiness: Business[] = await this.businessRepository.findByOwner(
      user_id,
    );

    const belongUser = userBusiness.some(
      (usrBusiness) => usrBusiness.id == business.id,
    );

    if (!belongUser) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business not belong user',
      });
    }

    const businessAvailability: Availability[] =
      await this.availabilityRepository.findAvailabilityByBusiness(business_id);

    console.log(createAvailabilityDto);
    const avalWeekDay: string[] = [];
    businessAvailability.forEach((ba) => {
      if (createAvailabilityDto.weekdays) {
        const res = createAvailabilityDto.weekdays.find(
          (a) => a == ba.weekdays_id,
        );
        if (res) avalWeekDay.push(ba.weekdays_id);
      } else if (createAvailabilityDto.weekdays_id) {
        if (ba.weekdays_id == createAvailabilityDto.weekdays_id)
          avalWeekDay.push(ba.weekdays_id);
      }
    });
    console.log(avalWeekDay);

    if (avalWeekDay.length > 0) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message:
          'Business Already have an Availability Created with the week days: [' +
          avalWeekDay.toString() +
          '], please update or delete it',
      });
    }

    let availabilities: Availability[] = [];

    if (createAvailabilityDto.weekdays) {
      for (const weekday_id of createAvailabilityDto.weekdays) {
        const availability = await this.availabilityRepository.create({
          ...createAvailabilityDto,
          weekdays_id: weekday_id,
          business_id,
        });

        if (!availability) {
          throw new BadRequestException({
            message: 'Error creating availability',
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
        availabilities.push(new Availability(availability));
      }
    } else {
      const availability = await this.availabilityRepository.create({
        ...createAvailabilityDto,
        business_id,
      });

      if (!availability) {
        throw new BadRequestException({
          message: 'Error creating availability',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      availabilities.push(new Availability(availability));
    }
    return availabilities;
  }

  async findOne(id: string) {
    const availability = await this.availabilityRepository.findOne(id);

    if (!availability) {
      throw new BadRequestException({
        message: 'Availability not found',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    availability.start_time = getStringFromDateTime(
      new Date(availability.start_time),
    );
    availability.end_time = getStringFromDateTime(
      new Date(availability.end_time),
    );
    return new Availability(availability);
  }

  async findAvailabilityByBusiness(business_id: string) {
    const businessExists = await this.businessRepository.findById(business_id);

    if (!businessExists) {
      throw new BadRequestException({
        message: 'Business does not exist',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const availabilitiesByBusiness =
      await this.availabilityRepository.findAvailabilityByBusiness(business_id);

    return availabilitiesByBusiness.map((availability) => {
      availability.start_time = getStringFromDateTime(
        new Date(availability.start_time),
      );
      availability.end_time = getStringFromDateTime(
        new Date(availability.end_time),
      );

      return new Availability(availability);
    });
  }

  async findAll() {
    const allAvailabilities = await this.availabilityRepository.findAll();

    return allAvailabilities.map((availability) => {
      availability.start_time = getStringFromDateTime(
        new Date(availability.start_time),
      );
      availability.end_time = getStringFromDateTime(
        new Date(availability.end_time),
      );
      return new Availability(availability);
    });
  }

  async update(id: string, updateAvailabilityDto: UpdateAvailabilityDto, user_id: string) {
    const availabilityExists = await this.availabilityRepository.findOne(id);

    if (!availabilityExists) {
      throw new BadRequestException({
        message: 'Availability not found',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const userBusiness: Business[] = await this.businessRepository.findByOwner(
      user_id,
    );

    const belongUser = userBusiness.some(
      (usrBusiness) => usrBusiness.id == availabilityExists.business_id,
    );

    if (!belongUser) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business not belong user',
      });
    }


    const updatedAvailability = await this.availabilityRepository.update(
      id,
      updateAvailabilityDto,
    );

    return new Availability(updatedAvailability);
  }

  async delete(id: string, user_id: string) {
    const availabilityExists = await this.availabilityRepository.findOne(id);

    if (!availabilityExists) {
      throw new BadRequestException({
        message: 'Availability not found',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
    
    const userBusiness: Business[] = await this.businessRepository.findByOwner(
      user_id,
    );

    const belongUser = userBusiness.some(
      (usrBusiness) => usrBusiness.id == availabilityExists.business_id,
    );

    if (!belongUser) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business not belong to user',
      });
    }

    const deletedAvailability = await this.availabilityRepository.delete(id);

    return deletedAvailability;
  }
}
