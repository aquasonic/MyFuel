import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

import { USER_MOCK } from '../models/user.mock';
import { InitializeUser } from '../state/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO: Attach to function api to store information in fauna db
  constructor(private store: Store) {}

  getCurrentUserName() {
    return this.store.select<string>(state => state.app.userName);
  }

  fetchData(userId: number) {
    const currentUserId = this.store.selectSnapshot<number>(state => state.app.userId);
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

    return this.store.dispatch(new InitializeUser({ id: userId, name: 'Unknown User', cars: [] }));
  }
}
