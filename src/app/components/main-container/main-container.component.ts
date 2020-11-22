import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { UserState } from 'src/app/state/user.state';

@Component({
  selector: 'myf-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
})
export class MainContainerComponent {
  private readonly userId$ = this.store.select(UserState.getUserId);

  readonly logoLink$ = this.userId$.pipe(map((userId) => (userId ? '/' + userId : '/')));

  constructor(private store: Store) {}
}
