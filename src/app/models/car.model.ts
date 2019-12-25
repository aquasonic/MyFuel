import { Fuel } from './fuel.model';

export interface Car {
  id: string;
  name: string;
  fuels: Fuel[];
}
