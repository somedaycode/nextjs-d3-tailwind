import type { NextPage } from 'next';
import Head from 'next/head';

import { useState } from 'react';

import { useSpotifyToken } from '@/hooks/useToken';

import Header from '@/components/Header';
import ArtistsSearchForm from '@/components/ArtistsSearchForm';
import NetworkGraph from '@/components/NetworkGraph';

const Network: NextPage = () => {
  useSpotifyToken();

  const [currentArtistId, setCurrentArtistId] = useState('');

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Head>
        <title>Spotify Artists Network Graph</title>
      </Head>
      <Header>
        <ArtistsSearchForm setCurrentArtistId={setCurrentArtistId} />
      </Header>
      <main className="w-3/4 h-full">
        <NetworkGraph currentArtistId={currentArtistId} />
      </main>
      {/* <aside className="fixed left-0 w-1/5 h-full bg-cyan-600">aside</aside> */}
    </div>
  );
};

export default Network;
