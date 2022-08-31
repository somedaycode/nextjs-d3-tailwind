import { ClientAccess } from '@/types';

const ACCOUNT_API = 'https://accounts.spotify.com/api/token';

export const fetchSpotifyToken = (): Promise<ClientAccess> => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const body = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

  return fetch(ACCOUNT_API, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => res.json());
};
