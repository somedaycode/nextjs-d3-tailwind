import type { SearchItems } from '@/types/search';
import type { NextApiRequest, NextApiResponse } from 'next';

import { apiHandler } from '@/helpers/api/apiHandler';
import { requestSpotify } from '@/helpers/api/requestSpotify';
import { errorHandler } from '@/helpers/api/errorHandler';

import { getSpotifyToken } from './token';

export default apiHandler({ get: getArtist });

async function getArtist(
  req: NextApiRequest,
  res: NextApiResponse<SearchItems>,
) {
  /**
   * TODO: Req body로 input
   */
  const query = `/search?q=${encodeURIComponent('르세라핌')}&type=artist`;

  try {
    let data = await requestSpotify(query);
    res.status(200).send(data);
  } catch (error) {
    await getSpotifyToken(req, res, true);
    errorHandler('잠깐! 문제가 있어요! 다시 한번 시도해주세요', res);
  }
}
