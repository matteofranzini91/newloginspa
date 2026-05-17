import { describe, expect, it } from 'vitest';

import { api } from './api/api';
import { store } from './store';

describe('store', () => {
  it('has the RTK Query api reducer mounted', () => {
    const state = store.getState();
    expect(state).toHaveProperty(api.reducerPath);
  });

  it('api.util.resetApiState clears cached queries', () => {
    store.dispatch(api.util.resetApiState());
    const state = store.getState();
    expect((state[api.reducerPath] as { queries: Record<string, unknown> }).queries).toEqual({});
  });
});
