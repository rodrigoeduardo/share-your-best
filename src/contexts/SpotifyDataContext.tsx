import { useSession } from 'next-auth/client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SpotifyArtistData, SpotifyTrackData } from '../models/SpotifyData';
import { SpotifySession } from '../models/SpotifySession';
import { api } from '../services/api';

interface SpotifyDataProviderProps {
  children: ReactNode;
}

interface SpotifyDataContextData {
  artistsData: SpotifyArtistData | null;
  tracksData: SpotifyTrackData | null;
}

const SpotifyDataContext = createContext({} as SpotifyDataContextData);

export function SpotifyDataProvider({ children }: SpotifyDataProviderProps) {
  const [artistsData, setArtistsData] = useState<SpotifyArtistData>(null);
  const [tracksData, setTracksData] = useState<SpotifyTrackData>(null);

  const [session] = useSession();

  useEffect(() => {
    getTopArtists();
    getTopTracks();
  }, [session]);

  async function getTopArtists() {
    if (!session) {
      return;
    }

    const spotifySession = session as SpotifySession;

    const response = await api.get<SpotifyArtistData>('/me/top/artists', {
      headers: { Authorization: `Bearer ${spotifySession.user.accessToken}` },
      params: {
        limit: 5,
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
      },
    });

    setTracksData(response.data);
  }

  return (
    <SpotifyDataContext.Provider value={{ artistsData, tracksData }}>
      {children}
    </SpotifyDataContext.Provider>
  );
}

export const useSpotifyData = () => useContext(SpotifyDataContext);
