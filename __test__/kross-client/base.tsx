import { QueryClient, QueryClientProvider } from 'react-query';
import { KrossClient } from '../../src/kross-client';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

export const base = () => {
  let client: KrossClient;
  const baseURL = 'https://olive-dev.kross.kr';
  const accessId = 'XLD7UY9GETOK7TPY';
  const secretKey = 'yLbVRHGgwT5c22ndOVT2';
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  beforeAll(() => {
    client = new KrossClient({
      baseURL,
      accessId,
      secretKey,
      adapter: require('axios/lib/adapters/http'),
    });
  });

  it('gets authToken and refreshToken', async () => {
    const { useLogin } = client.useAuthHooks();
    const { result } = renderHook(() => useLogin(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        keyid: 'mad@kross.kr',
        password:
          'OreaqkErj2E3aHRtqTSIqUQF9PI/s4bT7WrQsPIwvMvW9HFAFukHTwJEQJtjq0Ha5m482WYTPO7Jw9nidlyjBbKLoWhV/D3OhYSaEX3rjfXA48PefHuJC4ahO0pUdbnP0/Y8OQgrfcNhUcPVrysurCrTuA7EQtoxPxKHyfudBYQ7OX/yk+IyTlvCuapC1E/lKxP/UrdqsxUoqLrd1zwNis6rOICXtJ9PhbqWKwSWfHR9FyJc6wjEhheHsgAfTNMLHtuSeGfrQc9FiB7UkAYx7/10KkpvzR+oH99gEioHatrTvFegzBTfuDUvaIP0/6I8yFHz4ObVY+UqnlfybM4l8Q==',
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it.skip('updates authToken with refreshToken', async () => {
    const { updateAuthToken } = client.useAuthHooks();
    const { result } = renderHook(() => updateAuthToken(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
};
