// write test script for KrossClient

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
  it('login user with credentials', async () => {
    const loginResponse = await client.login({
      keyid,
      password,
    });

    expect(loginResponse.status).toBe(201);
  });

  it('get loans data', async () => {
    const loanDataResponse = await client.loanData({
      filter: 'state||$in||funding',
      take: '5',
      investable: false,
    });

    expect(loanDataResponse.status).toBe(200);
  });

  it('get account data', async () => {
    const accountDataResponse = await client.accountData({
      limit: '1',
      offset: '0',
    });

    expect(accountDataResponse.status).toBe(200);
  });
});
