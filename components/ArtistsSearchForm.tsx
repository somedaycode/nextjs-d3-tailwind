import { useState } from 'react';

import { MagnifyingGlassIcon } from '@/components/icons';
import Label from '@/components/Label';

import { useSearchArtists } from '@/hooks/useSearchArtists';

type Props = {
  setCurrentArtistId: (id: string) => void;
};

const ArtistsSearchForm = ({ setCurrentArtistId }: Props) => {
  const [artistKeyword, setArtistKeyword] = useState('');
  const artistsList = useSearchArtists(artistKeyword);

  return (
    <form className="max-w-sm" onSubmit={(e) => e.preventDefault()}>
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
      <div className="grid grid-cols-4 gap-1 max-w-xl h-40">
        {artistsList.length > 0 &&
          artistsList.map((artist) => {
            return (
              <Label
                key={artist.id}
                onClick={() => setCurrentArtistId(artist.id)}
              >
                {artist.name}
              </Label>
            );
          })}
      </div>
    </form>
  );
};

export default ArtistsSearchForm;
