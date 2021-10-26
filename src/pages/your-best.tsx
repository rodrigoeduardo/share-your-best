import {
  Button,
  Flex,
  Avatar,
  Text,
  HStack,
  Box,
  Link,
} from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FaShareAlt, FaSpotify, FaTwitter } from 'react-icons/fa';
import { Logo } from '../components/Logo';
import { TimeRangeButton } from '../components/TimeRangeButton';
import { Waves } from '../components/Waves';
import { MostListened } from '../components/YourBest/MostListened';
import { useSpotifyData } from '../contexts/SpotifyDataContext';
import { SpotifySession } from '../models/SpotifySession';

import { Tilt } from '../components/YourBest/Tilt';

export default function yourBest() {
  const { timeRange, setTimeRange } = useSpotifyData();

  const [session] = useSession();
  const spotifySession = session as SpotifySession;

  const router = useRouter();

  const currentDate = new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const tiltOptions = {
    reverse: true,
    speed: 1000,
    max: 5,
  };

  function handleSignOut() {
    signOut();
    router.push('/');
  }

  function handleTimeRangeChange(timeRange: string) {
    setTimeRange(timeRange);
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        url: 'https://shareyourbest.vercel.app/',
        title: 'share your best!',
        text: 'Login in with Spotify and share your most listened artists, albums and playlists!',
      });
    }
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

      <Box align="center">
        <HStack justifyContent="center" my="2rem">
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

        <Tilt
          options={tiltOptions}
          display="flex"
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
          p="2rem"
          borderRadius="1rem"
          boxShadow="2xl"
        >
          <Flex flexDir="column" align="center">
            <FaSpotify fontSize="3rem" color="#1ed760" />
            <Logo fontSize="2rem" />
          </Flex>

          <Flex mt="1rem" marginX="auto">
            <Avatar
              name={spotifySession?.user.name}
              src={spotifySession?.user.picture}
              boxSize="4rem"
            />
            <Text
              textAlign="left"
              fontSize="1.5rem"
              fontWeight="medium"
              lineHeight="1.8rem"
              ml="1rem"
            >
              the best of
              <Text color="green.600">{spotifySession?.user.name}</Text>
            </Text>
          </Flex>

          <Text letterSpacing="0.5rem" mt="1rem" marginX="auto">
            {convertTimeRangeToReadableSentence(timeRange)}
          </Text>

          <Flex flexDir="column" mt="1rem" align="center">
            <MostListened type="artists" />
          </Flex>

          <Flex flexDir="column" mt="2rem" align="center">
            <MostListened type="songs" />
          </Flex>

          <Text mt="auto" marginX="auto">
            📅 {currentDate}
          </Text>
        </Tilt>

        <Text fontWeight="bold" fontSize="2rem" mt="2rem">
          Share now with your friends and family!
        </Text>

        <HStack spacing={2} display="flex" justifyContent="center" mt="1rem">
          <Link
            isExternal
            href="https://twitter.com/intent/tweet?hashtags=shareyourbest&original_referer=https%3A%2F%2Fpublish.twitter.com%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&text=I%20have%20good%20taste%20in%20music%20and%20you%3F%20Share%20your%20best%20in&url=https%3A%2F%2Fshareyourbest.vercel.app%2F"
          >
            <Button
              colorScheme="twitter"
              leftIcon={<FaTwitter />}
              w="fit-content"
            >
              Tweet
            </Button>
          </Link>

          <Button
            colorScheme="blue"
            leftIcon={<FaShareAlt />}
            w="fit-content"
            onClick={() => handleShare()}
          >
            Share
          </Button>

          {session && (
            <Button
              colorScheme="green"
              leftIcon={<FaSpotify />}
              w="fit-content"
              onClick={() => handleSignOut()}
            >
              Log out
            </Button>
          )}
        </HStack>

        <Text my="3rem">
          Made by{' '}
          <Link
            href="https://github.com/rodrigoeduardo"
            isExternal
            color="green.600"
          >
            Rodrigo Eduardo
          </Link>{' '}
          🎈
        </Text>
      </Box>
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
