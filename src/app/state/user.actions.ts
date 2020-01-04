export class FetchUser {
  static readonly type = '[User] Fetch';
  constructor(public userId: string) {}
}
