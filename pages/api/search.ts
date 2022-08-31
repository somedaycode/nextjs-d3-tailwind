import { fetchSpotifyApi } from '@/services/server-api';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { SearchItems } from '@/types/search';

type SpotifySearchError = {
  error: {
    status: number;
    message: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Promise<SearchItems> | unknown>,
) {
  /**
   * TODO: Req body로 input
   */
  const query = `/search?q=${encodeURIComponent('르세라핌')}&type=artist`;
  try {
    const data = await fetchSpotifyApi(query);
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    res.json(error as SpotifySearchError);
  }
}
