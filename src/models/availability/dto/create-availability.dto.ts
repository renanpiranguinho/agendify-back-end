import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Validate,
  ValidateIf,
} from 'class-validator';

export class CreateAvailabilityDto {
  @IsNotEmpty({
    message: 'start_time is required',
  })
  @Matches(RegExp('([0-9]+(:[0-9]+)+)'))
  start_time: string;

  @IsNotEmpty({
    message: 'end_time is required',
  })
  @Matches(RegExp('([0-9]+(:[0-9]+)+)'))
  end_time: string;

  @ValidateIf(o => o.weekdays_id == undefined)
  @IsArray()
  @IsString({
    each: true,
    message: 'weekdays must be a string array',
  })
  @IsNotEmpty({
    message: 'weekdays is required',
  })
  weekdays: string[];

  @ValidateIf(o => o.weekdays == undefined)
  @IsString({
    message: 'Weekdays_id must be a string',
  })
  @IsNotEmpty({
    message: 'weekdays_id is required',
  })
  weekdays_id: string;

  @IsString({
    message: 'Business ID must be a string',
  })
  @IsNotEmpty({
    message: 'Business ID is required',
  })
  business_id: string;
}
