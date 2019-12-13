import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { Car } from 'src/app/models/car.model';

import { AddCar, DeleteCar, UpdateCar } from '../state/car.actions';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  readonly cars$: Observable<Car[]> = this.store.select(state => state.app.cars.sort((a, b) => a.name.localeCompare(b.name)));

  constructor(private store: Store) {}

  addCar(car: Car) {
    return of(true).pipe(
      delay(1000),
      switchMap(_ => {
        car.id = Math.floor(Math.random() * Math.floor(1000));
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

  deleteRecipe(id: number) {
    return of(true).pipe(
      delay(1000),
      switchMap(_ => this.store.dispatch(new DeleteCar(id)))
    );
  }
}
