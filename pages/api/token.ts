import type { NextApiRequest, NextApiResponse } from 'next';

import type { ClientAccess } from '@/types';
import { fetchSpotifyToken } from '@/services/server-api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClientAccess>,
) {
  const data = await fetchSpotifyToken();
  res.status(200).json(data);
}
