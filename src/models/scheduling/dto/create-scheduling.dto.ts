import {
  IsString,
  IsNotEmpty
} from 'class-validator';

export class CreateSchedulingDto {

  @IsNotEmpty({
    message: 'Date is required',
  })
  @IsString({
    message: 'Date must be a Date',
  })
  datetime: string;

  //@IsOptional()
  //@IsString({
  //  message: 'PaymentType ID must be a string',
  //})
  //paymentType: string;

  @IsNotEmpty({
    message: 'Schedule must have a User ID',
  })
  @IsString({
    message: 'User ID must be a string',
  })
  user_id: string;

  @IsNotEmpty({
    message: 'Schedule must have a Service ID',
  })
  @IsString({
    message: 'Service ID must be a string',
  })
  service_id: string;

}
