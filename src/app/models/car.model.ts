import { Fuel } from './fuel.model';

export interface Car {
  id?: number;
  name: string;
  fuels: Fuel[];
}
