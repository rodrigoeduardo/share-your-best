import {
  Button,
  SimpleGrid,
  Flex,
  Avatar,
  Text,
  HStack,
  Box,
} from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FaSpotify } from 'react-icons/fa';
import { TimeRangeButton } from '../components/TimeRangeButton';
import { Waves } from '../components/Waves';
import { useSpotifyData } from '../contexts/SpotifyDataContext';

export default function yourBest() {
  const { artistsData, tracksData, timeRange, setTimeRange } = useSpotifyData();
  const [session] = useSession();

  const router = useRouter();

  function handleSignOut() {
    signOut();
    router.push('/');
  }

  function handleTimeRangeChange(timeRange: string) {
    setTimeRange(timeRange);
  }

  return (
    <>
      <Waves />

      <Text fontSize="3rem" fontWeight="bold" textAlign="center" pt="4rem">
        best of {session?.user.name}
      </Text>

      <HStack justifyContent="center">
        <TimeRangeButton
          changeTimeRange={() => handleTimeRangeChange('short_term')}
          name="Last Month"
          isActive={timeRange == 'short_term'}
        />
        <TimeRangeButton
          changeTimeRange={() => handleTimeRangeChange('medium_term')}
          name="Last 6 Months"
          isActive={timeRange == 'medium_term'}
        />
        <TimeRangeButton
          changeTimeRange={() => handleTimeRangeChange('long_term')}
          name="All Time"
          isActive={timeRange == 'long_term'}
        />
      </HStack>

      <SimpleGrid columns={5} spacing={10} pt="2rem">
        {artistsData?.items.map((artist) => {
          return (
            <Flex key={artist.id} flexDir="column" align="center">
              <Avatar
                name={artist.name}
                src={artist.images[0].url}
                boxSize="200px"
              />
              <Text>{artist.name}</Text>
            </Flex>
          );
        })}
      </SimpleGrid>

      <SimpleGrid columns={5} spacing={10} mt="1rem">
        {tracksData?.items.map((track) => {
          return (
            <Flex key={track.id} flexDir="column" align="center">
              <Avatar
                name={track.name}
                src={track.album.images[0].url}
                boxSize="200px"
              />
              <Text>{track.name}</Text>
            </Flex>
          );
        })}
      </SimpleGrid>

      {session && (
        <Box align="center">
          <Button
            colorScheme="green"
            leftIcon={<FaSpotify />}
            w="fit-content"
            mt="2rem"
            onClick={() => handleSignOut()}
          >
            Log out
          </Button>
        </Box>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
