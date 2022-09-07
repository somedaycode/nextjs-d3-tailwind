import type { SearchItem, SearchItems } from '@/types/search';
import type { NextApiRequest, NextApiResponse } from 'next';

import { apiHandler } from '@/helpers/api/apiHandler';
import { requestSpotify } from '@/helpers/api/requestSpotify';
import { errorHandler } from '@/helpers/api/errorHandler';

import { getSpotifyToken } from './token';

export default apiHandler({ post: getArtist });

async function getArtist(
  req: NextApiRequest,
  res: NextApiResponse<SearchItem[]>,
) {
  try {
    const artist = req.body;
    const query = `/search?q=${encodeURIComponent(artist)}&type=artist`;
    const data: SearchItems = await requestSpotify(query);
    const searchArtists = data.artists.items;
    res.status(200).json(searchArtists);
  } catch (error) {
    await getSpotifyToken(req, res, true);
    errorHandler('잠깐! 문제가 있어요! 다시 한번 시도해주세요', res);
  }
}
