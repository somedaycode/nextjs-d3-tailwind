import type { NextApiRequest, NextApiResponse } from 'next';
import { errorHandler } from './errorHandler';

type Method = 'get' | 'post';

type Handler = {
  get?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  post?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
};

export function apiHandler(handler: Handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method?.toLowerCase() as Method | undefined;

    if (!method)
      return res
        .status(405)
        .end(`${req.method}는 허용되지 않는 method 입니다.`);

    try {
      await handler[method]!(req, res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
}
