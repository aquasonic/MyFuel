import { Car } from '../models/car.model';

export class CreateCar {
  static readonly type = '[Car] Create';
  constructor(public userId: string, public car: Car) {}
}

export class UpdateCar {
  static readonly type = '[Car] Update';
  constructor(public car: Car) {}
}

export class DeleteCar {
  static readonly type = '[Car] Delete';
  constructor(public carId: string) {}
}
