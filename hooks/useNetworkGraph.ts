import { DEFAULT_NEWORK_VALUE } from '@/consts';
import type { Network } from '@/types';

import { useQuery } from '@tanstack/react-query';

import { spotifyService } from '@/services/spotifyService';
export function useNetworkGraph(id: string) {
  return useQuery<Network>(
    ['networkGraphData', id],
    () => spotifyService.fetchRelatedArtistGraphData(id),

    {
      initialData: DEFAULT_NEWORK_VALUE,
    },
  );
}
