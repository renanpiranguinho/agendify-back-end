export class Scheduling {
  id: string;
  datetime: Date;
  //paymentType?: string;
  user_id: string;
  service_id: string;

  created_at: Date;
  updated_at?: Date;

  constructor(scheduling: Partial<Scheduling>) {
    Object.assign(this, scheduling);
  }
}
