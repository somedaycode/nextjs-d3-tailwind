import type { SearchItems, SearchError } from '@/types/search';
import type { NextApiRequest, NextApiResponse } from 'next';

import { fetchSpotifyApi } from '@/services/server-api';
import { saveSpotifyToken } from './token';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchItems | SearchError>,
) {
  /**
   * TODO: Req body로 input
   */
  const query = `/search?q=${encodeURIComponent('르세라핌')}&type=artist`;

  try {
    let data = await fetchSpotifyApi(query);

    /** search를 했지만, 토큰이 만료되었을 경우 */
    if ('error' in data) {
      await saveSpotifyToken();
      data = await fetchSpotifyApi(query);
    }

    res.status(200).send(data);
  } catch (error) {
    res.json(error as SearchError);
  }
}
