import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserState } from 'src/app/state/user.state';

@Component({
  selector: 'myf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private readonly isAuthorized$ = this.store.select(UserState.isAuthorized);
  private readonly userId$ = this.store.select(UserState.getUserId);

  readonly logoLink$ = combineLatest(this.isAuthorized$, this.userId$).pipe(
    map(([isAuthorized, userId]) => (isAuthorized === true ? '/' + userId : '/'))
  );

  constructor(private store: Store) {}
}
