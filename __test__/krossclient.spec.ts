// write test script for KrossClient

import { format, subMonths } from 'date-fns';
import { KrossClient } from '../src/kross-client';

describe('Kross Finance SDK', () => {
  const baseURL = process.env.BASE_URL as string;
  const accessId = process.env.ACCESS_ID as string;
  const secretKey = process.env.SECRET_KEY as string;
  const keyid = process.env.KEY_ID as string;
  const password = process.env.PASSWORD as string;

  const client: KrossClient = new KrossClient({
    baseURL,
    accessId,
    secretKey,
    // eslint-disable-next-line no-undef
    adapter: require('axios/lib/adapters/http'),
  });

  describe('Authentication', () => {
    it('should login user with credentials', async () => {
      const loginResponse = await client.login({
        keyid,
        password,
      });

      expect(loginResponse.status).toBe(201);
    });

    it('refresh authToken will return 401 as by default tokens are created for 15 minutes validity', async () => {
      let refreshTokenResponse;
      try {
        refreshTokenResponse = await client.updateAuthToken();
      } catch (e) {
        refreshTokenResponse = e;
      }

      expect(refreshTokenResponse.response.status).toBe(401);
    });
  });

  describe('User Specific Endpoints Tests ', () => {
    it('get users data', async () => {
      const accountDataResponse = await client.userData({
        take: '1',
      });

      expect(accountDataResponse.status).toBe(200);
    });

    it('get account data', async () => {
      const accountDataResponse = await client.accountData({
        limit: '1',
        offset: '0',
      });

      expect(accountDataResponse.status).toBe(200);
    });
  });

  describe('Loans Specific Endpoints Tests', () => {
    it('get loans data', async () => {
      const loanDataResponse = await client.loanData({
        filter: 'state||$in||funding',
        take: '5',
        investable: false,
      });

      expect(loanDataResponse.status).toBe(200);
    });
  });

  describe('Investments Specific Endpoints Tests', () => {
    it('cancels the pending investment with investment_id', async () => {
      const investmentId = 0;
      const investmentRegisterDataResponse = await client.investmentCancel(
        investmentId
      );

      expect(investmentRegisterDataResponse.status).toBe(200);
    });

    it('get investments list', async () => {
      const accountDataResponse = await client.investmentList({
        take: '1',
      });

      expect(accountDataResponse.status).toBe(200);
    });

    it('get notes data', async () => {
      const notesDataResponse = await client.notes({
        take: '5',
      });

      expect(notesDataResponse.status).toBe(200);
    });

    it('get notes summary data', async () => {
      const notesSummaryDataResponse = await client.notesSummary({
        state: 'funding',
      });

      expect(notesSummaryDataResponse.status).toBe(200);
    });

    it('get notes data by owner name', async () => {
      const notesByOwnerDataResponse = await client.notesByOwnersName({
        take: '5',
      });

      expect(notesByOwnerDataResponse.status).toBe(200);
    });

    it('get return on investments', async () => {
      const curDate = new Date();
      const endDate = format(new Date(), 'yyyyMMdd');
      const startDate = format(subMonths(curDate, 1), 'yyyyMMdd');
      const returnOnInvestmentsDataResponse = await client.returnOnInvestments({
        roiType: 'investment',
        startDate,
        endDate,
      });

      expect(returnOnInvestmentsDataResponse.status).toBe(200);
    });

    it('get return on investments list', async () => {
      const curDate = new Date();
      const endDate = format(new Date(), 'yyyyMMdd');
      const startDate = format(subMonths(curDate, 1), 'yyyyMMdd');
      const returnOnInvestmentsListDataResponse =
        await client.returnOnInvestmentsList({
          userIds: '14218',
          startDate,
          endDate,
        });

      expect(returnOnInvestmentsListDataResponse.status).toBe(200);
    });

    it('create trade notes', async () => {
      const createTakeNoteDataResponse = await client.tradeNotes({
        note_id: 348201,
        origin_amount: 1000000,
        trade_price: 1000000,
      });

      expect(createTakeNoteDataResponse.status).toBe(201);
    });
  });
});
