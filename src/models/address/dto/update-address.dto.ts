import { PartialType } from '@nestjs/mapped-types';
import { CreateAdressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAdressDto) {
}
