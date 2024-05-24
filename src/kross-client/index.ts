import { KrossClientBase } from './base';
import {
  AccountResponse,
  FunctionRegistered,
  InvestmentCancelResponse,
  InvestmentListResponse,
  InvestmentRegisterDto,
  InvestmentRegisterResponse,
  InvestmentsWengeQueryDto,
  KrossClientOptions,
  LoansQueryDto,
  LoansResponse,
  NotesByOwnersNameResponse,
  NotesResponse,
  NotesSummaryQueryDto,
  NotesSummaryResponse,
  ReturnOnInvestments,
  ReturnOnInvestmentsDto,
  ReturnOnInvestmentsListDto,
  UserQueryDto,
  UserResponse,
  UserWengeQueryDto,
  tradeNotesDto,
  tradeNotesResponse,
} from '../types';
export class KrossClient extends KrossClientBase {
  // User Specific Functions
  accountData: FunctionRegistered<AccountResponse, UserQueryDto>;
  userData: FunctionRegistered<UserResponse, UserWengeQueryDto>;

  // Loans Specific Functions
  loanData: FunctionRegistered<LoansResponse, LoansQueryDto>;

  // Investments Specific Functions
  investmentList: FunctionRegistered<
    InvestmentListResponse,
    InvestmentsWengeQueryDto
  >;

  notes: FunctionRegistered<NotesResponse, InvestmentsWengeQueryDto>;

  notesByOwnersName: FunctionRegistered<
    NotesByOwnersNameResponse,
    InvestmentsWengeQueryDto
  >;

  notesSummary: FunctionRegistered<NotesSummaryResponse, NotesSummaryQueryDto>;

  returnOnInvestments: FunctionRegistered<
    ReturnOnInvestments,
    ReturnOnInvestmentsDto
  >;

  returnOnInvestmentsList: FunctionRegistered<
    ReturnOnInvestments[],
    ReturnOnInvestmentsListDto
  >;

  constructor(options: KrossClientOptions) {
    super(options);
    // User Specific Endpoints
    this.accountData = KrossClientBase.registerFunction<
      AccountResponse,
      UserQueryDto
    >({
      url: '/users/account',
      method: 'get',
    });

    this.userData = KrossClientBase.registerFunction<
      UserResponse,
      UserWengeQueryDto
    >({
      url: '/users',
      method: 'get',
    });

    // Loans Specific Endpoints
    this.loanData = KrossClientBase.registerFunction<
      LoansResponse,
      LoansQueryDto
    >({
      url: '/loans',
      method: 'get',
    });

    // Investments Specific Endpoints
    this.notes = KrossClientBase.registerFunction<
      NotesResponse,
      InvestmentsWengeQueryDto
    >({
      url: '/notes',
      method: 'get',
    });

    this.notesByOwnersName = KrossClientBase.registerFunction<
      NotesByOwnersNameResponse,
      InvestmentsWengeQueryDto
    >({
      url: '/notes/includes/owner-name',
      method: 'get',
    });

    this.investmentList = KrossClientBase.registerFunction<
      InvestmentListResponse,
      InvestmentsWengeQueryDto
    >({
      url: '/investments',
      method: 'get',
    });

    this.notesSummary = KrossClientBase.registerFunction<
      NotesSummaryResponse,
      NotesSummaryQueryDto
    >({
      url: '/notes/summary',
      method: 'get',
    });

    this.returnOnInvestments = KrossClientBase.registerFunction<
      ReturnOnInvestments,
      ReturnOnInvestmentsDto
    >({
      url: '/investments/roi',
      method: 'get',
    });

    this.returnOnInvestmentsList = KrossClientBase.registerFunction<
      ReturnOnInvestments[],
      ReturnOnInvestmentsListDto
    >({
      url: '/investments/roi-list',
      method: 'get',
    });
  }

  tradeNotes(notes: tradeNotesDto) {
    return this.instance.post<tradeNotesResponse>('/notes/trade', notes);
  }

  investmentRegister(investments: InvestmentRegisterDto[]) {
    return this.instance.post<InvestmentRegisterResponse>(
      '/investments',
      investments
    );
  }

  investmentCancel(investmentId: number) {
    return this.instance.patch<InvestmentCancelResponse>(
      `/investments/${investmentId}/cancel`,
      {
        investment_id: investmentId,
      }
    );
  }
}

export { KrossClientBase, KrossClientOptions };
