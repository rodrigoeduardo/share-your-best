import { Flex, Text } from '@chakra-ui/react';

export default function Home() {
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
    </Flex>
  );
}
