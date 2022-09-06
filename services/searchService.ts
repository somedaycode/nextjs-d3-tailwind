import { SearchItems } from './../types/search';
import myFetch from './http';

export const searchService = {
  postSearchArtist: (artist: string): Promise<SearchItems | unknown> =>
    myFetch.post('/search', {
      method: 'POST',
      body: JSON.stringify(artist),
    }),
};
