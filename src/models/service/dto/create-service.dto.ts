import {
  IsEmpty,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty({
    message: 'field name is missing',
  })
  @IsString({
    message: 'field name Invalid format',
  })
  name: string;

  @IsNotEmpty({
    message: 'field description is missing',
  })
  description: string;

  @IsEmpty()
  image_url: string;
  @IsOptional()
  duration: string;

  @IsNumberString()
  @IsOptional()
  price: number;

  @IsNotEmpty({
    message: 'field business_id is missing',
  })
  business_id: string;
}
