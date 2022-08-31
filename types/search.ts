export type SearchError = {
  error: { status: 401; message: 'Invalid access token' };
};

export type SearchItems = {
  href: string;
  items: SearchItem[];
};

export type SearchItem = {
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
