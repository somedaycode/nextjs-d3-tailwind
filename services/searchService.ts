import type { SearchItem } from '@/types';
import myFetch from './http';

export const searchService = {
  postSearchArtist: (artist: string): Promise<SearchItem[]> => {
    return myFetch.post('/search', {
      method: 'POST',
      body: artist,
    });
  },
};
