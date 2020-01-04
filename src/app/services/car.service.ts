import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  // TODO: Attach to fauna db
  createCar(userId: string, car: Car) {
    return of(Math.floor(Math.random() * Math.floor(1000)).toString()).pipe(delay(1000));
  }

  updateCar(car: Car) {
    return of(true).pipe(
      delay(1000),
      map(_ => car.timestamp)
    );
  }

  deleteCar(carId: string) {
    return of(true).pipe(
      delay(1000),
      map(_ => carId)
    );
  }
}
