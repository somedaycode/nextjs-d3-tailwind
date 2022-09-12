import type { Artist, Network } from '@/types';
import myFetch from './http';

export const spotifyService = {
  checkTokenAvailable: () => myFetch.get('/token'),

  fetchSearchArtistResult: (artist: string): Promise<Artist[]> | [] => {
    if (!artist) return [];
    return myFetch.get(`/artists?name=${artist}`);
  },

  fetchRelatedArtistGraphData: (id: string): Promise<Network> => {
    return myFetch.get(`/artists/${id}`);
  },
};
