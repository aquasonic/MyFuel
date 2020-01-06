import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { Fuel } from 'src/app/models/fuel.model';
import { CreateFuel, DeleteFuel, UpdateFuel } from 'src/app/state/fuel.actions';
import { FetchUser } from 'src/app/state/user.actions';
import { UserState } from 'src/app/state/user.state';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FuelDialogComponent } from '../fuel-dialog/fuel-dialog.component';

@Component({
  selector: 'myf-car-detail-view',
  templateUrl: './car-detail-view.component.html',
  styleUrls: ['./car-detail-view.component.scss']
})
export class CarDetailViewComponent implements OnInit {
  @ViewChild(FuelDialogComponent, { static: false }) private fuelDialog: FuelDialogComponent;
  @ViewChild(ConfirmDialogComponent, { static: false }) private confirmDialog: ConfirmDialogComponent;

  private readonly userId = this.route.snapshot.params.user;
  private readonly carId = this.route.snapshot.params.car;

  initialized = false;
  selectedFuel: Fuel;

  readonly isAuthorized$ = this.store.select(UserState.isAuthorized);
  readonly car$ = this.store.select(UserState.getCarById).pipe(map(fn => fn(this.carId)));
  readonly fuels$ = this.store.select(UserState.getFuelsByCarId).pipe(map(fn => fn(this.carId)));

  constructor(private store: Store, private translateService: TranslateService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(new FetchUser(this.userId)).subscribe(_ => (this.initialized = true));
  }

  createFuel(carId: string) {
    const fuel = { date: new Date().toISOString().slice(0, 10) } as Fuel;
    this.fuelDialog.open(
      fuel,
      f => this.store.dispatch(new CreateFuel(carId, f)),
      f => (this.selectedFuel = f)
    );
  }

  updateFuel(fuel: Fuel) {
    this.fuelDialog.open(
      fuel,
      f => this.store.dispatch(new UpdateFuel(f)),
      f => (this.selectedFuel = f)
    );
  }

  deleteFuel(fuelId: string) {
    this.confirmDialog.open(
      this.translateService.instant('Fuel.DeleteFuelConfirmationTitle'),
      this.translateService.instant('Fuel.DeleteFuelConfirmationDescription'),
      fuelId,
      id => this.store.dispatch(new DeleteFuel(id)),
      () => (this.selectedFuel = undefined)
    );
  }

  selectFuel(fuel: Fuel) {
    if (this.selectedFuel !== undefined && this.selectedFuel.id === fuel.id) {
      this.selectedFuel = undefined;
    } else {
      this.selectedFuel = fuel;
    }
  }

  trackById(index: number, fuel: Fuel) {
    return fuel.id;
  }
}
