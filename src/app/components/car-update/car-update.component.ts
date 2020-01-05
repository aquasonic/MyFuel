import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Car } from 'src/app/models/car.model';
import { UpdateCar } from 'src/app/state/car.actions';

import { CarDialogComponent } from '../car-dialog/car-dialog.component';

@Component({
  selector: 'myf-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.scss']
})
export class CarUpdateComponent {
  @Input() car: Car;
  @Input() carDialog: CarDialogComponent;

  constructor(private store: Store) {}

  updateCar() {
    this.carDialog.open(this.car, c => this.store.dispatch(new UpdateCar(c)));
  }
}
