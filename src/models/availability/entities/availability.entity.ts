export class Availability {
  id: string;
  start_time: Date | string;
  end_time: Date | string;
  weekdays_id: string;
  business_id: string;

  created_at: Date;
  updated_at?: Date;

  constructor(availability: Partial<Availability>) {
    Object.assign(this, availability);
  }
}
