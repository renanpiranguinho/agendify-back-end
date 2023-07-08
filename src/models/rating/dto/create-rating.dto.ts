import {
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty({
    message: 'Rating is required',
  })
  @IsInt({
    message: 'Rating must be an integer',
  })
  @Min(0, {
    message: 'Rating interval is 0-5',
  })
  @Max(5, {
    message: 'Rating interval is 0-5',
  })
  rating: number;

  @IsOptional()
  description: string;

  @IsEmpty()
  user_id: string;

  @IsNotEmpty({
    message: 'Business ID is required',
  })
  @IsString({
    message: 'Business ID must be a string',
  })
  business_id: string;
}
