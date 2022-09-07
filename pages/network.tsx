import type { NextPage } from 'next';
import Head from 'next/head';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { useSpotifyToken } from '@/hooks/useToken';
import { useNetworkGraph } from '@/hooks/useNetworkGraph';

import type { Artist } from '@/types';
import { spotifyService } from '@/services/spotifyService';

import Header from '@/components/Header';
import { MagnifyingGlassIcon } from '@/components/icons';
import Label from '@/components/Label';

const Network: NextPage = () => {
  useSpotifyToken();

  const [artistKeyword, setArtistKeyword] = useState('');
  const [currentArtistId, setCurrentArtistId] = useState('');
  const networkGraphData = useNetworkGraph(currentArtistId);

  const {
    isLoading,
    isError,
    data: artists,
  } = useQuery<Artist[]>(['searchArtist', { artistKeyword }], () =>
    spotifyService.postSearchArtist(artistKeyword),
  );

  return (
    <div className="min-h-screen">
      <Head>
        <title>Spotify Artists Network Graph</title>
      </Head>
      <Header>
        <form className="max-w-sm">
          <label className="flex flex-col">
            <span className="p-2 text-sm font-medium text-sky-900">
              Search an Artist to draw Related Artists Network Graph
            </span>
            <div className="relative">
              <input
                className="w-full p-4 pr-10 border-solid border-2 border-blue-400 rounded-2xl"
                placeholder="르세라핌"
                value={artistKeyword}
                onChange={(e) => setArtistKeyword(e.target.value)}
              />
              <MagnifyingGlassIcon className="w-8 h-8 text-blue-300 absolute top-1/4 right-2 cursor-pointer" />
            </div>
          </label>
          <p className="flex items-center p-2 h-10 ">Are you looking for...?</p>
          <div className="grid grid-cols-4 gap-1 max-w-xl ">
            {isLoading
              ? `${artistKeyword && 'Searching...'}`
              : isError
              ? 'error!'
              : artists.length > 0
              ? artists.map((artist) => {
                  return (
                    <Label
                      key={artist.id}
                      onClick={() => setCurrentArtistId(artist.id)}
                    >
                      {artist.name}
                    </Label>
                  );
                })
              : null}
          </div>
        </form>
      </Header>
      <main>{artistKeyword}</main>
    </div>
  );
};

export default Network;
