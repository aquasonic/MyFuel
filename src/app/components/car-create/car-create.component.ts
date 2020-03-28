import { Component, Input, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { Car } from 'src/app/models/car.model';
import { CreateCar } from 'src/app/state/car.actions';

import { CarDialogComponent } from '../car-dialog/car-dialog.component';

@Component({
  selector: 'myf-car-create',
  templateUrl: './car-create.component.html'
})
export class CarCreateComponent {
  @ViewChild(CarDialogComponent) private carDialog: CarDialogComponent;

  @Input() private userId: string;

  constructor(private store: Store) {}

  createCar() {
    const car = { dateOfPurchase: new Date().toISOString().slice(0, 10) } as Car;
    this.carDialog.open(car, c => this.store.dispatch(new CreateCar(this.userId, c)));
  }
}
