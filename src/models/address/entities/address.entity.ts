import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class Address
 {
  id: string;
  postal_code: string;
  number: string;
  street: string;
  district: string;
  city: string;
  state: string;

  created_at: Date;
  updated_at?: Date;

  constructor(user: Partial<Address>) {
    Object.assign(this, user);
  }
}
