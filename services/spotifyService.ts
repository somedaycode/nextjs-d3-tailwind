import type { Artist } from '@/types';
import myFetch from './http';

export const spotifyService = {
  checkTokenAvailable: () => myFetch.get('/token'),

  postSearchArtist: (artist: string): Promise<Artist[]> => {
    return myFetch.post('/artists', {
      method: 'POST',
      body: artist,
    });
  },
};
