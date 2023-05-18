import { IsNotEmpty, IsString } from 'class-validator';

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

  image_url: string;
  duration: string;
  price: number;

  @IsNotEmpty({
    message: 'field business_id is missing',
  })
  business_id: string;
}
