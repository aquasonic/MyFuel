import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { concat } from 'rxjs';
import { map } from 'rxjs/operators';
import { Fuel } from 'src/app/models/fuel.model';
import { CarState } from 'src/app/state/car.state';
import { CreateFuel, DeleteFuel, SelectFuel, UpdateFuel } from 'src/app/state/fuel.actions';
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

  readonly isAuthorized$ = this.store.select(UserState.isAuthorized);
  readonly car$ = this.store.select(UserState.getCarById).pipe(map(fn => fn(this.carId)));
  readonly fuels$ = this.store.select(UserState.getFuelsByCarId).pipe(map(fn => fn(this.carId)));
  readonly selectedFuel$ = this.store.select(CarState.getSelectedFuel);

  constructor(private store: Store, private translateService: TranslateService, private route: ActivatedRoute) {}

  ngOnInit() {
    concat(this.store.dispatch(new FetchUser(this.userId)), this.store.dispatch(new SelectFuel(undefined))).subscribe(_ => {
      this.initialized = true;
    });
  }

  createFuel(carId: string) {
    const fuel = { date: new Date().toISOString().slice(0, 10) } as Fuel;
    this.fuelDialog.open(fuel, f => this.store.dispatch(new CreateFuel(carId, f)));
  }

  updateFuel(fuel: Fuel) {
    this.fuelDialog.open(fuel, f => this.store.dispatch(new UpdateFuel(f)));
  }

  deleteFuel(fuelId: string) {
    this.confirmDialog.open(
      this.translateService.instant('Fuel.DeleteFuelConfirmationTitle'),
      this.translateService.instant('Fuel.DeleteFuelConfirmationDescription'),
      fuelId,
      id => this.store.dispatch(new DeleteFuel(id)),
      () => {}
    );
  }

  selectFuel(fuel: Fuel) {
    this.store.dispatch(new SelectFuel(fuel)).subscribe();
  }

  trackById(index: number, fuel: Fuel) {
    return fuel.id;
  }
}
