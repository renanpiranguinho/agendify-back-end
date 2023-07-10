import { IsEmpty, IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateSchedulingDto {
  @IsNotEmpty({
    message: 'Date is required',
  })
  @IsDateString({})
  datetime: Date;

  //@IsOptional()
  //@IsString({
  //  message: 'PaymentType ID must be a string',
  //})
  //paymentType: string;

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
