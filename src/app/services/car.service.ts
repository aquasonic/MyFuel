import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { Car } from 'src/app/models/car.model';

import { AppState } from '../state/app.state';
import { AddCar, DeleteCar, UpdateCar } from '../state/car.actions';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  @Select(AppState.getCars) public cars$: Observable<Car[]>;

  constructor(private store: Store) {}

  public addCar(car: Car) {
    car.id = Math.floor(Math.random() * Math.floor(1000));

    return of(true).pipe(
      delay(1000),
      switchMap(_ => this.store.dispatch(new AddCar(car)))
    );
  }

  public updateCar(car: Car) {
    return of(true).pipe(
      delay(1000),
      switchMap(_ => this.store.dispatch(new UpdateCar(car)))
    );
  }

  public deleteRecipe(id: number) {
    return of(true).pipe(
      delay(1000),
      switchMap(_ => this.store.dispatch(new DeleteCar(id)))
    );
  }
}
