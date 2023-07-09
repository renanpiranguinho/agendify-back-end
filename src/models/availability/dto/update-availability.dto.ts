import { IsEmpty } from 'class-validator';
import { CreateAvailabilityDto } from './create-availability.dto';

export class UpdateAvailabilityDto extends CreateAvailabilityDto {
  @IsEmpty()
  business_id: string;
}
