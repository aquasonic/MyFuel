import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { FetchUser } from 'src/app/state/user.actions';
import { UserState } from 'src/app/state/user.state';

@Component({
  selector: 'myf-car-list-view',
  templateUrl: './car-list-view.component.html'
})
export class CarListViewComponent implements OnInit {
  private readonly cars$ = this.store.select(UserState.getCars);

  readonly userId = this.route.snapshot.params.user;

  readonly isLoading$ = this.store.select(UserState.isLoading);
  readonly isAuthorized$ = this.store.select(UserState.isAuthorized);
  readonly userName$ = this.store.select(UserState.getUserName);
  readonly activeCars$ = this.cars$.pipe(map(cars => cars.filter(c => !c.archived)));
  readonly archivedCars$ = this.cars$.pipe(map(cars => cars.filter(c => c.archived)));

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(new FetchUser(this.userId));
  }
}
