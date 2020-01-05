import { Component, ViewChild } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Store } from '@ngxs/store';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserState } from 'src/app/state/user.state';

import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'myf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild(CarDialogComponent, { static: false }) private carDialog: CarDialogComponent;
  @ViewChild(ConfirmDialogComponent, { static: false }) private confirmDialog: ConfirmDialogComponent;

  private readonly isAuthorized$ = this.store.select(UserState.isAuthorized);
  private readonly carId$ = this.router.events.pipe(
    filter(e => e instanceof RoutesRecognized),
    map(e => (<RoutesRecognized>e).state.root.firstChild.params.car)
  );

  readonly userId$ = this.store.select(UserState.getUserId);

  readonly car$ = combineLatest(this.carId$, this.store.select(UserState.getCarById)).pipe(map(([carId, carByIdFn]) => carByIdFn(carId)));

  readonly logoLink$ = combineLatest(this.isAuthorized$, this.userId$).pipe(
    map(([isAuthorized, userId]) => (isAuthorized === true ? '/' + userId : '/'))
  );

  constructor(private store: Store, private router: Router) {}
}
