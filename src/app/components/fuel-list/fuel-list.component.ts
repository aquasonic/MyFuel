import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Fuel } from 'src/app/models/fuel.model';
import { FuelService } from 'src/app/services/fuel.service';
import { CarState } from 'src/app/state/car.state';
import { SelectFuel } from 'src/app/state/fuel.actions';

@Component({
  selector: 'myf-fuel-list',
  templateUrl: './fuel-list.component.html',
  styleUrls: ['./fuel-list.component.scss']
})
export class FuelListComponent {
  @Input() fuels: Fuel[];
  @Input() canSelectFuel: boolean;

  readonly selectedFuel$ = this.store.select(CarState.getSelectedFuel);

  constructor(private store: Store, private fuelService: FuelService) {}

  selectFuel(fuel: Fuel) {
    this.store.dispatch(new SelectFuel(fuel)).subscribe();
  }

  getConsumation(fuel: Fuel) {
    return this.fuelService.getConsumation(fuel);
  }

  trackById(index: number, fuel: Fuel) {
    return fuel.id;
  }
}
