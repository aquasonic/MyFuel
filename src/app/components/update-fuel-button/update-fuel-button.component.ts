import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { FuelDialogComponent } from 'src/app/dialogs/fuel-dialog/fuel-dialog.component';
import { Fuel } from 'src/app/models/fuel.model';
import { UpdateFuel } from 'src/app/state/fuel.actions';

@Component({
  selector: 'myf-update-fuel-button',
  templateUrl: './update-fuel-button.component.html',
})
export class UpdateFuelButtonComponent {
  @Input() private fuel: Fuel;
  @Input() private dialog: FuelDialogComponent;

  constructor(private store: Store) {}

  updateFuel() {
    this.dialog.open(this.fuel, (c) => this.store.dispatch(new UpdateFuel(c)));
  }
}
