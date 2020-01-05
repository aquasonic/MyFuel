import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Car } from 'src/app/models/car.model';
import { DeleteCar } from 'src/app/state/car.actions';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'myf-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.scss']
})
export class CarDeleteComponent {
  @Input() userId: string;
  @Input() car: Car;
  @Input() confirmDialog: ConfirmDialogComponent;

  constructor(private store: Store, private router: Router) {}

  deleteCar(carId: string) {
    this.confirmDialog.open(
      'Delete car?',
      'Are you sure you want to delete this car with all the fuel data? This can not be undone.',
      carId,
      id => this.store.dispatch(new DeleteCar(id)),
      () => this.router.navigate(['/', this.userId])
    );
  }
}
