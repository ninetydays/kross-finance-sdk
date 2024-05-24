import { KrossClientBase } from './base';
import { KrossClientOptions } from '../types';
import { User } from './user';
import { Loans } from './loans';
import { Investments } from './investments';
export class KrossClient extends KrossClientBase {
  user: User;
  investments: Investments;
  loans: Loans;
  constructor(options: KrossClientOptions) {
    super(options);
    this.user = new User(options);
    this.investments = new Investments(options);
    this.loans = new Loans(options);
  }
}

export { KrossClientBase, KrossClientOptions, User, Loans, Investments };
