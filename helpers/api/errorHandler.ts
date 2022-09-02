import type { NextApiResponse } from 'next';

export function errorHandler(error: unknown, res: NextApiResponse) {
  res.send({ status: 'failed', message: error });
}
