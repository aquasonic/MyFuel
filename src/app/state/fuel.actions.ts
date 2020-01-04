import { Fuel } from '../models/fuel.model';

export class CreateFuel {
  static readonly type = '[Fuel] Create';
  constructor(public carId: string, public fuel: Fuel) {}
}

export class UpdateFuel {
  static readonly type = '[Fuel] Update';
  constructor(public fuel: Fuel) {}
}

export class DeleteFuel {
  static readonly type = '[Fuel] Delete';
  constructor(public fuelId: string) {}
}
