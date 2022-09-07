import { spotifyService } from '@/services/spotifyService';
import { useEffect, useState } from 'react';
import type { Network } from '@/types';

export function useNetworkGraph(id: string) {
  const [networkGraphData, setNetworkGraphData] = useState<Network>({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    const fetchGraphData = async () => {
      const data = await spotifyService.fetchRelatedArtistGraphData(id);
      setNetworkGraphData(data);
    };

    fetchGraphData();
  }, [id]);

  return networkGraphData;
}
