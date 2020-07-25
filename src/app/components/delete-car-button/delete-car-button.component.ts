import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { DeleteCar } from 'src/app/state/car.actions';

import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'myf-delete-car-button',
  templateUrl: './delete-car-button.component.html'
})
export class DeleteCarButtonComponent {
  @Input() private userId: string;
  @Input() private carId: string;
  @Input() private dialog: ConfirmDialogComponent;

  constructor(private store: Store, private translateService: TranslateService, private router: Router) {}

  deleteCar() {
    this.dialog.open(
      this.translateService.instant('Car.DeleteConfirmationTitle'),
      this.translateService.instant('Car.DeleteConfirmationDescription'),
      this.carId,
      id => this.store.dispatch(new DeleteCar(id)),
      () => this.router.navigate(['/', this.userId])
    );
  }
}
