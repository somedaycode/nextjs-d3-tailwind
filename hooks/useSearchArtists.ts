import { spotifyService } from '@/services/spotifyService';
import { Artist } from '@/types';
import { useEffect, useState } from 'react';

export function useSearchArtists(artist: string) {
  const [searchArtists, setSearchArtists] = useState<Artist[]>([]);

  useEffect(() => {
    if (!artist) return;
    const fetchGraphData = async () => {
      const data = await spotifyService.fetchSearchArtistResult(artist);
      setSearchArtists(data);
    };

    fetchGraphData();
  }, [artist]);

  return searchArtists;
}
