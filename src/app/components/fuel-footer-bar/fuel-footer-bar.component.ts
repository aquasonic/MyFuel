import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { FuelDialogComponent } from 'src/app/dialogs/fuel-dialog/fuel-dialog.component';
import { CarState } from 'src/app/state/car.state';

@Component({
  selector: 'myf-fuel-footer-bar',
  templateUrl: './fuel-footer-bar.component.html',
  styleUrls: ['./fuel-footer-bar.component.scss'],
})
export class FuelFooterBarComponent {
  @Input() confirmDialog: ConfirmDialogComponent;
  @Input() fuelDialog: FuelDialogComponent;

  readonly selectedFuel$ = this.store.select(CarState.getSelectedFuel);

  constructor(private store: Store) {}
}
