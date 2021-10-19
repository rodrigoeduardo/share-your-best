import { useSession } from 'next-auth/client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SpotifyData } from '../models/SpotifyData';
import { SpotifySession } from '../models/SpotifySession';
import { api } from '../services/api';

interface SpotifyDataProviderProps {
  children: ReactNode;
}

interface SpotifyDataContextData {
  data: SpotifyData | null;
}

const SpotifyDataContext = createContext({} as SpotifyDataContextData);

export function SpotifyDataProvider({ children }: SpotifyDataProviderProps) {
  const [data, setData] = useState<SpotifyData>(null);
  const [session] = useSession();

  useEffect(() => {
    getArtists();
  }, [session]);

  async function getArtists() {
    if (!session) {
      return;
    }

    const spotifySession = session as SpotifySession;

    const response = await api.get<SpotifyData>('/me/top/artists', {
      headers: { Authorization: `Bearer ${spotifySession.user.accessToken}` },
    });

    setData(response.data);
  }

  return (
    <SpotifyDataContext.Provider value={{ data }}>
      {children}
    </SpotifyDataContext.Provider>
  );
}

export const useSpotifyData = () => useContext(SpotifyDataContext);
