export type Artists = {
  artists: {
    href: string;
    items: Artist[];
  };
};

export type Artist = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null | string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: [
    {
      height: 640;
      url: string;
      width: 640;
    },
    {
      height: 320;
      url: string;
      width: 320;
    },
    {
      height: 160;
      url: string;
      width: 160;
    },
  ];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
};
