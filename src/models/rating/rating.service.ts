import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { UsersRepository } from '../users/repository/user.repository';
import { RatingRepository } from './repository/rating.repository';
import { Rating } from './entities/rating.entity';
import { BusinessRepository } from '../business/repository/business.repository';

@Injectable()
export class RatingService {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly userRepository: UsersRepository,
    private readonly businessRepository: BusinessRepository,
  ) {}

  async create(createRatingDto: CreateRatingDto, userId: string) {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new BadRequestException({
        message: 'User does not exist',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const rating = await this.ratingRepository.create(createRatingDto, userId);

    if (!rating) {
      throw new BadRequestException({
        message: 'Error creating rating',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    return new Rating(rating);
  }

  async findOne(id: string) {
    const rating = await this.ratingRepository.findOne(id);

    if (!rating) {
      throw new BadRequestException({
        message: 'Rating not found',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    return new Rating(rating);
  }

  async findMyRatings(userId: string) {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new BadRequestException({
        message: 'User does not exist',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const myRatings = await this.ratingRepository.findMyRatings(userId);

    return myRatings.map((rating) => new Rating(rating));
  }

  async findRatingsByBusiness(businessId: string) {
    const businessExists = await this.businessRepository.findById(businessId);

    if (!businessExists) {
      throw new BadRequestException({
        message: 'Business does not exist',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const ratingsByBusiness = await this.ratingRepository.findRatingsByBusiness(
      businessId,
    );

    return ratingsByBusiness.map((rating) => new Rating(rating));
  }

  async findAll() {
    const allRatings = await this.ratingRepository.findAll();

    return allRatings.map((rating) => new Rating(rating));
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    const ratingExists = await this.ratingRepository.findOne(id);

    if (!ratingExists) {
      throw new BadRequestException({
        message: 'Rating not found',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const updatedRating = await this.ratingRepository.update(
      id,
      updateRatingDto,
    );

    return new Rating(updatedRating);
  }

  async delete(id: string) {
    const ratingExists = await this.ratingRepository.findOne(id);

    if (!ratingExists) {
      throw new BadRequestException({
        message: 'Rating not found',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const deletedRating = await this.ratingRepository.delete(id);

    return deletedRating;
  }
}
