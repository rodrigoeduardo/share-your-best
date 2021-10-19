import { Flex, Text, Button, SimpleGrid, Avatar } from '@chakra-ui/react';
import { FaSpotify } from 'react-icons/fa';

import { useSession, signIn, getSession } from 'next-auth/client';
import { useSpotifyData } from '../contexts/SpotifyDataContext';
import { Logo } from '../components/Logo';
import Router from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export default function Home() {
  // const { data } = useSpotifyData();
  const [session] = useSession();

  return (
    <Flex flexDir="column" maxW="1080px" margin="0 auto" pt="1rem">
      <Logo />

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
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: '/your-best',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

// <SimpleGrid columns={5} spacing={10}>
//   {data?.items.map((artist) => {
//     return (
//       <Flex key={artist.id} flexDir="column" align="center">
//         <Avatar name={artist.name} src={artist.images[0].url} />
//         <Text>{artist.name}</Text>
//       </Flex>
//     );
//   })}
// </SimpleGrid>
