import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import {
  InvestmentCancelResponse,
  InvestmentListResponse,
  InvestmentRegisterDto,
  NotesResponse,
  InvestmentRegisterResponse,
  InvestmentsWengeQueryDto,
  tradeNotesDto,
  NotesByOwnersNameResponse,
  tradeNotesResponse,
  NotesSummaryResponse,
  ReturnOnInvestments,
  NotesSummaryQueryDto,
  ReturnOnInvestmentsDto,
  ReturnOnInvestmentsListDto,
} from '../types/kross-client/investments';
export class Investments extends KrossClientBase {
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

    this.notes = Investments.registerFunction<
      NotesResponse,
      InvestmentsWengeQueryDto
    >({
      url: '/notes',
      method: 'get',
    });

    this.notesByOwnersName = Investments.registerFunction<
      NotesByOwnersNameResponse,
      InvestmentsWengeQueryDto
    >({
      url: '/notes/includes/owner-name',
      method: 'get',
    });

    this.investmentList = Investments.registerFunction<
      InvestmentListResponse,
      InvestmentsWengeQueryDto
    >({
      url: '/investments',
      method: 'get',
    });

    this.notesSummary = Investments.registerFunction<
      NotesSummaryResponse,
      NotesSummaryQueryDto
    >({
      url: '/notes/summary',
      method: 'get',
    });

    this.returnOnInvestments = Investments.registerFunction<
      ReturnOnInvestments,
      ReturnOnInvestmentsDto
    >({
      url: '/investments/roi',
      method: 'get',
    });

    this.returnOnInvestmentsList = Investments.registerFunction<
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
