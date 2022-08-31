import type { ClientAccess } from '@/types';

import { SPOTIFY_TOKEN } from '@/consts/index';
import { cacheStore } from '@/utils/cache';

const API_END_POINT = 'https://api.spotify.com/v1';

export const request = (path: string = '') => {
  const { token_type, access_token }: ClientAccess =
    cacheStore.getCache(SPOTIFY_TOKEN);

  return fetch(`${API_END_POINT}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token_type} ${access_token}`,
    },
  });
};
