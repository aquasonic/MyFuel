import { Car } from './car.model';

export interface User {
  id: number;
  name: string;
  cars: Car[];
}
