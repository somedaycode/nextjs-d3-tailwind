const API_END_POINT = 'https://api.spotify.com/v1';
const OAUTH_TOKEN = '';

export const request = (path: string = '') => {
  return fetch(`${API_END_POINT}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OAUTH_TOKEN}`,
    },
  });
};
