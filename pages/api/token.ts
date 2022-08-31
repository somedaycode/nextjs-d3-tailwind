import type { NextApiRequest, NextApiResponse } from 'next';

import { SPOTIFY_TOKEN } from '@/consts';
import { cacheStore } from '@/utils/cache';
import { fetchSpotifyToken } from '@/services/server-api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ status: number; message: string }>,
) {
  try {
    await saveSpotifyToken();
    res.status(200).json({ status: 200, message: 'ok' });
  } catch (error) {
    console.error(error);
  }
}

export async function saveSpotifyToken() {
  const data = await fetchSpotifyToken();
  cacheStore.setCache(SPOTIFY_TOKEN, data);
}
