import type { NextApiRequest, NextApiResponse } from 'next';

import { SPOTIFY_TOKEN } from '@/consts';
import { cacheStore } from '@/utils/cache';

import { apiHandler } from '@/helpers/api/apiHandler';

export default apiHandler({ get: getSpotifyToken });

const ACCOUNT_API = 'https://accounts.spotify.com/api/token';
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

export async function getSpotifyToken(
  req: NextApiRequest,
  res: NextApiResponse,
  isRefreshing = false,
) {
  const savedToken = cacheStore.getCache(SPOTIFY_TOKEN);
  if (savedToken)
    return res.json({ status: 'ok', message: '이미 토큰이 있습니다.' });
  const body = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;
  const data = await fetch(ACCOUNT_API, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const token = await data.json();
  cacheStore.setCache(SPOTIFY_TOKEN, token);

  if (isRefreshing) return;
  return res
    .status(200)
    .json({ status: 'ok', message: 'token safely saved in server' });
}
