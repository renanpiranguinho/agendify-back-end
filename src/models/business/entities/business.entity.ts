import { IRatingInfo } from "../../rating/repository/rating.repository";

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
  rating?: IRatingInfo;

  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(business: Partial<Business>) {
    Object.assign(this, business);
  }
}
