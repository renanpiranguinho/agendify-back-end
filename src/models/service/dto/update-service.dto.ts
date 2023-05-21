import { PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import { IsNumber } from 'class-validator';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @IsNumber()
  price?: number;
}
