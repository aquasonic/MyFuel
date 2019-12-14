import { Fuel } from '../models/fuel.model';

export class AddFuel {
  static readonly type = '[Fuel] Add';
  constructor(public carId: number, public fuel: Fuel) {}
}

export class UpdateFuel {
  static readonly type = '[Fuel] Update';
  constructor(public carId: number, public fuel: Fuel) {}
}

export class DeleteFuel {
  static readonly type = '[Fuel] Delete';
  constructor(public carId, public fuelId: number) {}
}
