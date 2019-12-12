import { User } from '../models/user.model';

export class InitializeUser {
  static readonly type = '[User] Initialize';
  constructor(public user: User) {}
}
