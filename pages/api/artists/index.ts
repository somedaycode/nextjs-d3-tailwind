import type { Artist, Artists } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

import { apiHandler } from '@/helpers/api/apiHandler';
import { errorHandler } from '@/helpers/api/errorHandler';
import { requestSpotify } from '@/helpers/api/requestSpotify';

import { getSpotifyToken } from '../token';

export default apiHandler({
  get: getArtist,
});

async function getArtist(req: NextApiRequest, res: NextApiResponse<Artist[]>) {
  try {
    const name = req.query.name as string;

    if (!name) return res.status(200).json([]);

    const query = `/search?q=${encodeURIComponent(name)}&type=artist`;
    const data: Artists = await requestSpotify(query);
    const searchArtists = data.artists.items;
    return res.status(200).json(searchArtists);
  } catch (error) {
    if (error) return await getSpotifyToken(req, res, true);
    return errorHandler('잠깐! 문제가 있어요! 다시 한번 시도해주세요', res);
  }
}
