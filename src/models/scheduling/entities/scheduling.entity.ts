export class Scheduling {
  id: string;
  start_datetime: Date;
  end_datetime: Date;

  user_id: string;
  service_id: string;

  created_at: Date;
  updated_at?: Date;

  constructor(scheduling: Partial<Scheduling>) {
    Object.assign(this, scheduling);
  }
}
