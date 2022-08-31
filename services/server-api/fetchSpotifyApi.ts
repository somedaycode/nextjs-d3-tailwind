import { SearchItems } from '@/types';
import { request } from './request';

export const fetchSpotifyApi = (path: string): Promise<SearchItems> => {
  return request(path).then((res) => res.json());
};
