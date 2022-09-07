import myFetch from './http';

export const spotifyService = {
  checkTokenAvailable: () => myFetch.get('/token'),
};
