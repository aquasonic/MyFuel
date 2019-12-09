import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Car } from 'src/model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private readonly cars$ = of([
    { id: '1', name: 'Audi RS 3' },
    { id: '2', name: 'Porsche 911' }
  ] as Car[]);

  getCars(userId: string) {
    if (userId === '0') {
      return of([] as Car[]);
    }

    return this.cars$.pipe(delay(1000));
  }
}
