import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';

import { Car } from '../models/car.model';
import { Fuel } from '../models/fuel.model';
import { AddFuel, DeleteFuel, UpdateFuel } from '../state/fuel.actions';

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  // TODO: Attach to function api to store information in fauna db
  constructor(private store: Store) {}

  getAllFuelsByCarId(id: number) {
    return this.store
      .select<Car>(state => state.app.cars.filter((c: Car) => c.id === id)[0])
      .pipe(map(c => c.fuels.sort((a: Fuel, b: Fuel) => new Date(b.date).getTime() - new Date(a.date).getTime())));
  }

  addFuel(carId: number, fuel: Fuel) {
    return of(true).pipe(
      delay(1000),
      switchMap(_ => {
        fuel.id = Math.floor(Math.random() * Math.floor(1000));
        return this.store.dispatch(new AddFuel(carId, fuel));
      })
    );
  }

  updateFuel(carId: number, fuel: Fuel) {
    return of(true).pipe(
      delay(1000),
      switchMap(_ => this.store.dispatch(new UpdateFuel(carId, fuel)))
    );
  }

  deleteFuel(carId: number, fuelId: number) {
    return of(true).pipe(
      delay(1000),
      switchMap(_ => this.store.dispatch(new DeleteFuel(carId, fuelId)))
    );
  }
}
