export class Business {
  id: string;
  name: string;
  description: string;
  is_operating: boolean;
  image_url: string;
  telephone: string;
  address_id: string;
  owner_id: string;
  category_id: string;

  created_at: Date;
  updated_at?: Date;

  constructor(user: Partial<Business>) {
    Object.assign(this, user);
  }
}
