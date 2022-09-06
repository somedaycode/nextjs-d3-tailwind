import type { NextPage } from 'next';
import Head from 'next/head';

import Label from '@/components/Label';
import Header from '@/components/Header';
import { MagnifyingGlassIcon } from '@/components/icons';
import { useEffect } from 'react';
import { searchService } from '@/services/searchService';
import { spotifyService } from '@/services/spotifyService';

const Network: NextPage = () => {
  useEffect(() => {
    /**TODO: 훅으로 빼기 */
    spotifyService.checkTokenAvailable();

    /**TODO: 상태로 검색어 관리 */
    searchService.postSearchArtist('ive').then((res) => console.log(res));
  }, []);

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
              />
              <MagnifyingGlassIcon className="w-8 h-8 text-blue-300 absolute top-1/4 right-2 cursor-pointer" />
            </div>
          </label>
          <p className="flex items-center p-2 h-10 ">Are you looking for...?</p>
          <div className="grid grid-cols-4 gap-1 max-w-xl ">
            <Label>르세라핌</Label>
            <Label>아이브</Label>
            <Label>아이즈원아이즈원</Label>
            <Label>아이즈원소녀시대잇지아이즈원소녀시대잇지</Label>
            <Label>ITZY</Label>
            <Label>소녀시대</Label>
          </div>
        </form>
      </Header>
      <main></main>
    </div>
  );
};

export default Network;
