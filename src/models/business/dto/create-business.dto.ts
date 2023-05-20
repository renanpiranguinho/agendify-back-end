import { Type } from 'class-transformer';
import { IsEmpty, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class Address {
  readonly id: string;
  @IsNotEmpty()
  readonly postal_code: string;
  @IsNotEmpty()
  readonly number: string;
  @IsNotEmpty()
  readonly street: string;
  @IsNotEmpty()
  readonly district: string;
  @IsNotEmpty()
  readonly city: string;
  @IsNotEmpty()
  readonly state: string;
}

export class CreateBusinessDto {
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

  @IsNotEmpty({
    message: 'field image_url is missing',
  })
  image_url: string;

  @IsNotEmpty({
    message: 'field telephone is missing',
  })
  telephone: string;

  @IsNotEmpty({
    message: 'address is missing',
  })
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsEmpty()
  owner_id?: string;

  @IsNotEmpty({
    message: 'field category_id is missing',
  })
  category_id: string;
}
