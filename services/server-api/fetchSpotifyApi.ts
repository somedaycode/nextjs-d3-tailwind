import { SearchError, SearchItems } from '@/types';
import { request } from './request';

export const fetchSpotifyApi = (
  path: string,
): Promise<SearchItems | SearchError> => {
  return request(path).then((res) => res.json());
};
