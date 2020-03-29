import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Car } from 'src/app/models/car.model';
import { CreateCar } from 'src/app/state/car.actions';

import { CarDialogComponent } from '../../dialogs/car-dialog/car-dialog.component';

@Component({
  selector: 'myf-create-car-button',
  templateUrl: './create-car-button.component.html'
})
export class CreateCarButtonComponent {
  @Input() private userId: string;
  @Input() private dialog: CarDialogComponent;

  constructor(private store: Store) {}

  createCar() {
    const car = { dateOfPurchase: new Date().toISOString().slice(0, 10) } as Car;
    this.dialog.open(car, c => this.store.dispatch(new CreateCar(this.userId, c)));
  }
}
