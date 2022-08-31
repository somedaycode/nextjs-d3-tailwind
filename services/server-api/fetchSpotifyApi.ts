import { SearchItems } from '@/types';
import { request } from './request';

export const fetchSpotifyApi = (path: string): Promise<SearchItems> => {
  console.log(path);
  return request(path).then((res) => res.json());
};
