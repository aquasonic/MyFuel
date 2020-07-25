import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { DeleteFuel } from 'src/app/state/fuel.actions';

@Component({
  selector: 'myf-delete-fuel-button',
  templateUrl: './delete-fuel-button.component.html'
})
export class DeleteFuelButtonComponent {
  @Input() private fuelId: string;
  @Input() private dialog: ConfirmDialogComponent;

  constructor(private store: Store, private translateService: TranslateService) {}

  deleteFuel() {
    this.dialog.open(
      this.translateService.instant('Fuel.DeleteConfirmationTitle'),
      this.translateService.instant('Fuel.DeleteConfirmationDescription'),
      this.fuelId,
      id => this.store.dispatch(new DeleteFuel(id)),
      () => {}
    );
  }
}
