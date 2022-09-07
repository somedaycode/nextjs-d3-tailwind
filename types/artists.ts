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
      height: number;
      url: string;
      width: number;
    },
    {
      height: number;
      url: string;
      width: number;
    },
    {
      height: number;
      url: string;
      width: number;
    },
  ];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
};
