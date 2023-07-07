export class Rating {
  id: string;
  rating: number;
  description?: string;
  user_id: string;
  business_id: string;

  created_at: Date;
  updated_at?: Date;

  constructor(rating: Partial<Rating>) {
    Object.assign(this, rating);
  }
}
