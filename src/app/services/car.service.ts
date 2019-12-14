import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { Car } from 'src/app/models/car.model';

import { AddCar, DeleteCar, UpdateCar } from '../state/car.actions';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  // TODO: Attach to function api to store information in fauna db
  constructor(private store: Store) {}

  getAllCars() {
    return this.store.select<Car[]>(state => state.app.cars.sort((a: Car, b: Car) => a.name.localeCompare(b.name)));
  }

  getCarById(id: number) {
    return this.store.select<Car>(state => state.app.cars.filter((c: Car) => c.id === id)[0]);
  }

  addCar(car: Car) {
    return of(true).pipe(
      delay(1000),
      switchMap(_ => {
        car.id = Math.floor(Math.random() * Math.floor(1000));
        car.fuels = [];
        return this.store.dispatch(new AddCar(car));
      })
    );
  }

  updateCar(car: Car) {
    return of(true).pipe(
      delay(1000),
      switchMap(_ => this.store.dispatch(new UpdateCar(car)))
    );
  }

  deleteCar(id: number) {
    return of(true).pipe(
      delay(1000),
      switchMap(_ => this.store.dispatch(new DeleteCar(id)))
    );
  }
}
