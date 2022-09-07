import type { Artist, Network } from '@/types';
import myFetch from './http';

export const spotifyService = {
  checkTokenAvailable: () => myFetch.get('/token'),

  postSearchArtist: (artist: string): Promise<Artist[]> => {
    return myFetch.post('/artists', {
      method: 'POST',
      body: artist,
    });
  },

  fetchRelatedArtistGraphData: (id: string): Promise<Network> => {
    return myFetch.get(`/artists?id=${id}`);
  },
};
