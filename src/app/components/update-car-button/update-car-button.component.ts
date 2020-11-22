import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Car } from 'src/app/models/car.model';
import { UpdateCar } from 'src/app/state/car.actions';

import { CarDialogComponent } from '../../dialogs/car-dialog/car-dialog.component';

@Component({
  selector: 'myf-update-car-button',
  templateUrl: './update-car-button.component.html',
})
export class UpdateCarButtonComponent {
  @Input() private car: Car;
  @Input() private dialog: CarDialogComponent;

  constructor(private store: Store) {}

  updateCar() {
    this.dialog.open(this.car, (c) => this.store.dispatch(new UpdateCar(c)));
  }
}
