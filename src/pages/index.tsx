import { Box, Flex, Text, Button, Image } from '@chakra-ui/react';
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

      <Box align="center" w="100vw" p="5rem">
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          maxW="1200px"
        >
          <Flex
            flexDir="column"
            maxW={{ base: '', md: '700px' }}
            align={{ base: 'center', md: 'left' }}
            justifyContent="center"
          >
            <Logo
              fontSize={{ base: '5rem', lg: '6rem' }}
              textAlign={{ base: 'center', md: 'left' }}
              mb={{ base: '1rem', md: '' }}
            />

            <Text
              fontSize="2rem"
              color="gray.200"
              textAlign={{ base: 'center', md: 'left' }}
            >
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
                h={{ base: '4rem', lg: '2.5rem' }}
              >
                Log in with Spotify
              </Button>
            )}
          </Flex>

          <Image
            src="assets/images/home-image.svg"
            boxSize="450px"
            alignSelf={{ base: 'center', md: 'left' }}
          />
        </Flex>
      </Box>
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
