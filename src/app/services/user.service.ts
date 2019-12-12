import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

import { USER_MOCK } from '../models/user.mock';
import { AppState } from '../state/app.state';
import { InitializeUser } from '../state/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  @Select(AppState.getUserId) public userId$: Observable<number>;

  constructor(private store: Store) {}

  fetchData(userId: number) {
    const currentUserId = this.store.selectSnapshot(AppState.getUserId);
    if (userId === currentUserId) {
      return of(true);
    }

    if (userId === 1) {
      return of(true).pipe(
        delay(1000),
        switchMap(_ => {
          return this.store.dispatch(new InitializeUser(USER_MOCK));
        })
      );
    }

    return this.store.dispatch(new InitializeUser({ id: userId, cars: [] }));
  }
}
