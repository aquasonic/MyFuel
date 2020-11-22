import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { SelectFuel } from 'src/app/state/fuel.actions';
import { FetchUser } from 'src/app/state/user.actions';
import { UserState } from 'src/app/state/user.state';

import { CarDialogComponent } from '../../dialogs/car-dialog/car-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { FuelDialogComponent } from '../../dialogs/fuel-dialog/fuel-dialog.component';

@Component({
  selector: 'myf-car-detail-view',
  templateUrl: './car-detail-view.component.html',
})
export class CarDetailViewComponent implements OnInit {
  @ViewChild(CarDialogComponent, { static: true }) carDialog: CarDialogComponent;
  @ViewChild(FuelDialogComponent, { static: true }) fuelDialog: FuelDialogComponent;
  @ViewChild(ConfirmDialogComponent, { static: true }) confirmDialog: ConfirmDialogComponent;

  private readonly userId = this.route.snapshot.params.user;
  private readonly carId = this.route.snapshot.params.car;

  readonly isLoading$ = this.store.select(UserState.isLoading);

  readonly isAuthorized$ = this.store.select(UserState.isAuthorized);
  readonly userId$ = this.store.select(UserState.getUserId);
  readonly car$ = this.store.select(UserState.getCarById).pipe(map((fn) => fn(this.carId)));
  readonly fuels$ = this.store.select(UserState.getFuelsByCarId).pipe(map((fn) => fn(this.carId)));

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(new FetchUser(this.userId));
    this.store.dispatch(new SelectFuel(undefined));
  }
}
