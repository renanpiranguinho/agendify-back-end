import { IsEmpty, IsNotEmpty } from 'class-validator';
export class CreateAdressDto {
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

  @IsEmpty()
  owner_id?: string;
}
