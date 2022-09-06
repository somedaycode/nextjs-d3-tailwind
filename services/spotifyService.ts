import myFetch from './http';

export const spotifyService = {
  checkTokenAvailable: async () => await myFetch.get('/token'),
};
