import { Car } from './car.model';

export interface User {
  id: string;
  name: string;
  cars: Car[];
}
