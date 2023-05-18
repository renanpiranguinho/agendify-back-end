export class Service {
  id: string;
  name: string;
  description: string;
  image_url: string;
  duration: string;
  price: number;
  business_id: string;

  created_at: Date;
  updated_at?: Date;

  constructor(service: Partial<Service>) {
    Object.assign(this, service);
  }
}
