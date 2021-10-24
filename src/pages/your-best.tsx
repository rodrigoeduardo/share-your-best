import { Button, Flex, Avatar, Text, HStack, Box } from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FaSpotify } from 'react-icons/fa';
import { Logo } from '../components/Logo';
import { TimeRangeButton } from '../components/TimeRangeButton';
import { Waves } from '../components/Waves';
import { MostListened } from '../components/YourBest/MostListened';
import { useSpotifyData } from '../contexts/SpotifyDataContext';
import { SpotifySession } from '../models/SpotifySession';

import MagicHover from 'magic-hover';

export default function yourBest() {
  const { timeRange, setTimeRange } = useSpotifyData();

  const options = {
    max: 10,
    reverse: true,
    perspective: 1000,
    scale: { x: 1, y: 1, z: 1 },
    rotate: 0,
    translate: { x: 0, y: 0 },
  };

  const [session] = useSession();
  const spotifySession = session as SpotifySession;

  const router = useRouter();

  const currentDate = new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  function handleSignOut() {
    signOut();
    router.push('/');
  }

  function handleTimeRangeChange(timeRange: string) {
    setTimeRange(timeRange);
  }

  function convertTimeRangeToReadableSentence(timeRange: string) {
    if (timeRange == 'medium_term') {
      return 'LAST 6 MONTHS';
    } else if (timeRange == 'short_term') {
      return 'LAST MONTH';
    } else if (timeRange == 'long_term') {
      return 'ALL TIME';
    }
  }

  return (
    <>
      <Waves />

      <HStack justifyContent="center" mt="1rem">
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

      <MagicHover options={options}>
        <Flex
          w={{
            base: '337.5px',
            md: '405px',
            xl: '540px',
          }}
          h={{
            base: '600px',
            md: '720px',
            xl: '960px',
          }}
          flexDir="column"
          bgColor="black"
          margin="1rem auto"
          p="2rem"
          align="center"
          borderRadius="1rem"
          boxShadow="2xl"
        >
          <Flex flexDir="column" align="center">
            <FaSpotify fontSize="3rem" color="#1ed760" />
            <Logo fontSize="2rem" />
          </Flex>

          <Flex mt="1rem">
            <Avatar
              name={spotifySession?.user.name}
              src={spotifySession?.user.picture}
              boxSize="4rem"
            />
            <Text
              fontSize="1.5rem"
              fontWeight="medium"
              lineHeight="1.8rem"
              ml="1rem"
            >
              the best of
              <Text color="green.600">{spotifySession?.user.name}</Text>
            </Text>
          </Flex>

          <Text letterSpacing="0.5rem" mt="1rem">
            {convertTimeRangeToReadableSentence(timeRange)}
          </Text>

          <Flex flexDir="column" mt="1rem" align="center">
            <MostListened type="artists" />
          </Flex>

          <Flex flexDir="column" mt="2rem" align="center">
            <MostListened type="songs" />
          </Flex>

          <Text mt="auto">📅 {currentDate}</Text>
        </Flex>
      </MagicHover>

      {session && (
        <Box align="center">
          <Button
            colorScheme="green"
            leftIcon={<FaSpotify />}
            w="fit-content"
            my="2rem"
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
