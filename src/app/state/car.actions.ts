import { Car } from '../models/car.model';

export class AddCar {
  static readonly type = '[Car] Add';
  constructor(public car: Car) {}
}

export class UpdateCar {
  static readonly type = '[Car] Update';
  constructor(public car: Car) {}
}

export class DeleteCar {
  static readonly type = '[Car] Delete';
  constructor(public id: string) {}
}
