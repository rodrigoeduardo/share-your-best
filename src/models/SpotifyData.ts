// ARTISTS

export type SpotifyArtistData = {
  items: ArtistItem[];
};

type ArtistItem = {
  name: string;
  id: string;
  images: Image[];
  external_urls: {
    spotify: string;
  };
};

type Image = {
  url: string;
};

// TRACKS

export type SpotifyTrackData = {
  items: TrackItem[];
};

type TrackItem = {
  name: string;
  id: string;
  album: {
    name: string;
    images: Image[];
    artists: TrackArtist[];
  };
  external_urls: {
    spotify: string;
  };
};

type TrackArtist = {
  name: string;
};

// PLAYLISTS

export type SpotifyPlaylistData = {
  items: PlaylistItem[];
};

type PlaylistItem = {
  name: string;
  id: string;
  images: Image[];
  external_urls: {
    spotify: string;
  };
};
