import { Flex, Text, Button, Image } from '@chakra-ui/react';
import { FaSpotify, FaLongArrowAltRight } from 'react-icons/fa';

import { useSession, signIn, getSession } from 'next-auth/client';
import { Logo } from '../components/Logo';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Waves } from '../components/Waves';

export default function Home() {
  const [session] = useSession();

  return (
    <>
      <Waves />

      <Flex justifyContent="space-between" pt="5rem" maxW="1200px" m="0 auto">
        <Flex flexDir="column" maxW="700px" justifyContent="center">
          <Logo />

          <Text fontSize="2rem" color="gray.200">
            Login in with Spotify and share your most listened artists, albums
            and playlists.
          </Text>

          {!session && (
            <Button
              colorScheme="green"
              leftIcon={<FaSpotify />}
              rightIcon={<FaLongArrowAltRight />}
              w="100%"
              alignSelf="center"
              mt="2rem"
              onClick={() => signIn('spotify')}
            >
              Log in with Spotify
            </Button>
          )}
        </Flex>

        <Image src="assets/images/home-image.svg" boxSize="450px" />
      </Flex>
    </>
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
