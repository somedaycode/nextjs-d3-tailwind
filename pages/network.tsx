import type { NextPage } from 'next';
import Head from 'next/head';

const Network: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Spotify Artists Network Graph</title>
      </Head>
      <h1>여기는 Network Page 입니다.</h1>
    </div>
  );
};

export default Network;
