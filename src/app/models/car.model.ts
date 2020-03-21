import { Fuel } from './fuel.model';

export interface Car {
  id: string;
  timestamp: number;
  name: string;
  dateOfPurchase: string;
  mileageAtPurchase: number;
  archived: boolean;
  fuels: Fuel[];
}
