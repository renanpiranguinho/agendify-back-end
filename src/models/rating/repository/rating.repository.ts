import { CreateRatingDto } from '../dto/create-rating.dto';
import { Rating } from '../entities/rating.entity';
import { IRatingRepository } from './i-rating.repository';
import { UpdateRatingDto } from '../dto/update-rating.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

export interface IRatingInfo {
  averageRating: number;
  totalRatings: number;
}

@Injectable()
export class RatingRepository implements IRatingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createRatingDto: CreateRatingDto,
    userId: string,
  ): Promise<Rating> {
    const rating = await this.prismaService.rating.create({
      data: {
        ...createRatingDto,
        user_id: userId,
      },
    });

    return rating;
  }

  async findOne(id: string): Promise<Rating> {
    const rating = await this.prismaService.rating.findFirst({
      where: { id },
    });

    return rating;
  }

  async findMyRatings(userId: string, businessId: string): Promise<Rating[]> {
    const condition = businessId
      ? { user_id: userId, business_id: businessId }
      : { user_id: userId };

    const myRatings = await this.prismaService.rating.findMany({
      where: {
        ...condition,
      },
    });

    return myRatings;
  }
  async findRatingsByBusiness(businessId: string): Promise<Rating[]> {
    const ratingsByBusiness = await this.prismaService.rating.findMany({
      where: {
        business_id: businessId,
      },
      include: {
        User: true,
      },
    });

    return ratingsByBusiness;
  }

  async findAll(): Promise<Rating[]> {
    const allRatings = await this.prismaService.rating.findMany();

    return allRatings;
  }

  async findAverageRatingByBusiness(businessId: string): Promise<IRatingInfo> {
    const ratingsByBusiness = await this.prismaService.rating.findMany({
      where: {
        business_id: businessId,
      },
    });

    const ratings = ratingsByBusiness.map((rating) => rating.rating);

    if (ratings.length === 0) return { averageRating: 0, totalRatings: 0 };

    const averageRating = ratings.reduce((a, b) => a + b) / ratings.length;

    const ratingInfo: IRatingInfo = {
      averageRating: averageRating,
      totalRatings: ratings.length,
    };

    return ratingInfo;
  }

  async update(
    id: string,
    { rating, description }: UpdateRatingDto,
  ): Promise<Rating> {
    const updatedRating = await this.prismaService.rating.update({
      where: { id },
      data: {
        rating,
        description,
      },
    });

    return updatedRating;
  }

  async delete(id: string): Promise<Rating> {
    const deletedRating = await this.prismaService.rating.delete({
      where: { id },
    });

    return deletedRating;
  }
}
