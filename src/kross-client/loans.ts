import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import { LoansResponse, LoansQueryDto } from '../types/kross-client/loans';
export class Loans extends KrossClientBase {
  loanData: FunctionRegistered<LoansResponse, LoansQueryDto>;

  constructor(options: KrossClientOptions) {
    super(options);

    this.loanData = Loans.registerFunction<LoansResponse, LoansQueryDto>({
      url: '/loans',
      method: 'get',
    });
  }
}
