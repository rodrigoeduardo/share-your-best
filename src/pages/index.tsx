import { Flex, Text, Button } from '@chakra-ui/react';
import { FaSpotify } from 'react-icons/fa';

import { useSession, signIn, signOut } from 'next-auth/client';
import { spotifySession } from '../models/spotifySession';
import { api } from '../services/api';

export default function Home() {
  const [session] = useSession();
  const spotifySession = session as spotifySession;

  async function getTopArtists() {
    const response = await api.get('/me/top/artists', {
      headers: { Authorization: `Bearer ${spotifySession.user.accessToken}` },
    });

    console.log(response);
  }

  return (
    <Flex flexDir="column" maxW="1080px" margin="0 auto" pt="1rem">
      {/* LOGO */}
      <Text fontSize="3rem" fontWeight="700" textAlign="center">
        share your
        <Text as="span" ml="0.8rem" color="green.600">
          best
        </Text>
        <Text as="span" ml="0.2rem">
          !
        </Text>
      </Text>
      {/* LOGO */}

      <Text fontSize="0.8rem" color="gray.200" textAlign="center">
        Login in with Spotify and share your most listened artists, albums and
        playlists.
      </Text>

      {!session && (
        <Button
          colorScheme="green"
          leftIcon={<FaSpotify />}
          w="fit-content"
          alignSelf="center"
          mt="2rem"
          onClick={() => signIn('spotify')}
        >
          Log in with Spotify
        </Button>
      )}

      {session && (
        <Button
          colorScheme="green"
          leftIcon={<FaSpotify />}
          w="fit-content"
          alignSelf="center"
          mt="2rem"
          onClick={getTopArtists}
        >
          Get Top Artists
        </Button>
      )}
    </Flex>
  );
}
