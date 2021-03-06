import { useSession } from 'next-auth/client';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  SpotifyArtistData,
  SpotifyPlaylistData,
  SpotifyTrackData,
} from '../models/SpotifyData';
import { SpotifySession } from '../models/SpotifySession';
import { api } from '../services/api';

interface SpotifyDataProviderProps {
  children: ReactNode;
}

interface SpotifyDataContextData {
  artistsData: SpotifyArtistData | null;
  tracksData: SpotifyTrackData | null;
  playlistsData: SpotifyPlaylistData | null;
  timeRange: 'short_term' | 'medium_term' | 'long_term';
  setTimeRange: Dispatch<SetStateAction<string>>;
}

const SpotifyDataContext = createContext({} as SpotifyDataContextData);

export function SpotifyDataProvider({ children }: SpotifyDataProviderProps) {
  const [artistsData, setArtistsData] = useState<SpotifyArtistData>(null);
  const [tracksData, setTracksData] = useState<SpotifyTrackData>(null);
  const [playlistsData, setPlaylistsData] = useState<SpotifyPlaylistData>(null);
  const [timeRange, setTimeRange] = useState<
    'short_term' | 'medium_term' | 'long_term'
  >('medium_term');

  const [session] = useSession();

  useEffect(() => {
    getTopArtists();
    getTopTracks();
    // getPlaylists();
  }, [session, timeRange]);

  async function getTopArtists() {
    if (!session) {
      return;
    }

    const spotifySession = session as SpotifySession;

    const response = await api.get<SpotifyArtistData>('/me/top/artists', {
      headers: { Authorization: `Bearer ${spotifySession.user.accessToken}` },
      params: {
        limit: 5,
        time_range: timeRange,
      },
    });

    setArtistsData(response.data);
  }

  async function getTopTracks() {
    if (!session) {
      return;
    }

    const spotifySession = session as SpotifySession;

    const response = await api.get<SpotifyTrackData>('/me/top/tracks', {
      headers: { Authorization: `Bearer ${spotifySession.user.accessToken}` },
      params: {
        limit: 5,
        time_range: timeRange,
      },
    });

    setTracksData(response.data);
  }

  async function getPlaylists() {
    if (!session) {
      return;
    }

    const spotifySession = session as SpotifySession;

    const response = await api.get<SpotifyPlaylistData>('/me/playlists', {
      headers: { Authorization: `Bearer ${spotifySession.user.accessToken}` },
    });

    setPlaylistsData(response.data);
  }

  return (
    <SpotifyDataContext.Provider
      value={{
        artistsData,
        tracksData,
        playlistsData,
        timeRange,
        setTimeRange,
      }}
    >
      {children}
    </SpotifyDataContext.Provider>
  );
}

export const useSpotifyData = () => useContext(SpotifyDataContext);
