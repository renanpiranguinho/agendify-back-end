import { CreateRatingDto } from '../dto/create-rating.dto';
import { Rating } from '../entities/rating.entity';
import { UpdateRatingDto } from '../dto/update-rating.dto';
import { IRatingInfo } from './rating.repository';

export interface IRatingRepository {
  create(createRatingDto: CreateRatingDto, userId: string): Promise<Rating>;
  findOne(id: string): Promise<Rating>;
  findMyRatings(userId: string, businessId: string): Promise<Rating[]>;
  findRatingsByBusiness(businessId: string): Promise<Rating[]>;
  findAverageRatingByBusiness(businessId: string): Promise<IRatingInfo>;
  findAll(): Promise<Rating[]>;
  update(id: string, updateRatingDto: UpdateRatingDto): Promise<Rating>;
  delete(id: string): Promise<Rating>;
}
