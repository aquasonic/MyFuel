import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { FuelDialogComponent } from 'src/app/dialogs/fuel-dialog/fuel-dialog.component';
import { Fuel } from 'src/app/models/fuel.model';
import { CreateFuel } from 'src/app/state/fuel.actions';

@Component({
  selector: 'myf-create-fuel-button',
  templateUrl: './create-fuel-button.component.html',
})
export class CreateFuelButtonComponent {
  @Input() private carId: string;
  @Input() private dialog: FuelDialogComponent;

  constructor(private store: Store) {}

  createFuel() {
    const fuel = { date: new Date().toISOString().slice(0, 10) } as Fuel;
    this.dialog.open(fuel, (f) => this.store.dispatch(new CreateFuel(this.carId, f)));
  }
}
