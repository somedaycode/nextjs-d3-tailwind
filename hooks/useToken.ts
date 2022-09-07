import { spotifyService } from '@/services/spotifyService';
import { useEffect } from 'react';

export function useSpotifyToken() {
  const initializeSpotifyTokenByChecking = async () =>
    await spotifyService.checkTokenAvailable();

  useEffect(() => {
    initializeSpotifyTokenByChecking();
  }, []);
}
