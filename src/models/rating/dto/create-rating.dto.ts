import {
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty({
    message: 'Rating is required',
  })
  @IsInt({
    message: 'Rating must be an integer',
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
