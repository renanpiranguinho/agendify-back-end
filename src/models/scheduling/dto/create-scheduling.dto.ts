import { IsEmpty, IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateSchedulingDto {
  @IsNotEmpty({
    message: 'Start date is required',
  })
  @IsDateString({})
  start_datetime: Date;

  @IsNotEmpty({
    message: 'End date is required',
  })
  @IsDateString({})
  end_datetime: Date;

  @IsEmpty()
  user_id: string;

  @IsNotEmpty({
    message: 'Schedule must have a Service ID',
  })
  @IsString({
    message: 'Service ID must be a string',
  })
  service_id: string;
}
