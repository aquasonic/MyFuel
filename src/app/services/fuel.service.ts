import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { Fuel } from '../models/fuel.model';

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  // TODO: Attach to fauna db
  createFuel(carId: string, fuel: Fuel) {
    return of(Math.floor(Math.random() * Math.floor(1000)).toString()).pipe(delay(1000));
  }

  updateFuel(fuel: Fuel) {
    return of(true).pipe(
      delay(1000),
      map(_ => fuel.timestamp)
    );
  }

  deleteFuel(fuelId: string) {
    return of(true).pipe(
      delay(1000),
      map(_ => fuelId)
    );
  }
}
