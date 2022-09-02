import type { ClientAccess } from '@/types';

import { SPOTIFY_TOKEN } from '@/consts/index';
import { cacheStore } from '@/utils/cache';

const API_END_POINT = 'https://api.spotify.com/v1';

export const requestSpotify = (path: string = '') => {
  const tokenData: ClientAccess = cacheStore.getCache(SPOTIFY_TOKEN);

  const { token_type, access_token } = tokenData;

  return fetch(`${API_END_POINT}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token_type} ${access_token}`,
    },
  }).then((res) => res.json());
};