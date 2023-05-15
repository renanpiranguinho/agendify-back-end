export interface SendConfirmationMailDto {
  email: string;
  name: string;
  url: string;
}

export interface SendSchedulingVoucherMailDto {
  email: string;
  name: string;
  date: string;
  time: string;
  businessName: string;
}
