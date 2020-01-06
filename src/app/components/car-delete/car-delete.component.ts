import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(private store: Store, private translateService: TranslateService, private router: Router) {}

  deleteCar(carId: string) {
    this.confirmDialog.open(
      this.translateService.instant('Car.DeleteCarConfirmationTitle'),
      this.translateService.instant('Car.DeleteCarConfirmationDescription'),
      carId,
      id => this.store.dispatch(new DeleteCar(id)),
      () => this.router.navigate(['/', this.userId])
    );
  }
}
