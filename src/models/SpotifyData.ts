export type SpotifyData = {
  items: Item[];
};

type Item = {
  external_urls: {
    spotify: string;
  };
  name: string;
  id: string;
  images: Image[];
};

type Image = {
  url: string;
};
