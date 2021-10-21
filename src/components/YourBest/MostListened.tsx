import { Flex, Avatar, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useSpotifyData } from '../../contexts/SpotifyDataContext';
import { SongsListItem } from './SongsListItem';

interface MostListenedProps {
  type: 'artists' | 'songs';
}

export function MostListened({ type }: MostListenedProps) {
  const { artistsData, tracksData } = useSpotifyData();

  if (type == 'artists') {
    return (
      <>
        <Text fontSize="1.5rem" fontWeight="bold">
          My most listened
          <Text as="span" color="green.600" ml="0.5rem">
            artists
          </Text>
        </Text>

        <Flex mt="0.5rem">
          <Avatar
            boxSize="10rem"
            name={artistsData?.items[0].name}
            src={artistsData?.items[0].images[0].url}
          />

          <SimpleGrid columns={2} ml="0.5rem">
            <Avatar
              boxSize="5rem"
              name={artistsData?.items[1].name}
              src={artistsData?.items[1].images[0].url}
            />
            <Avatar
              boxSize="5rem"
              name={artistsData?.items[2].name}
              src={artistsData?.items[2].images[0].url}
            />
            <Avatar
              boxSize="5rem"
              name={artistsData?.items[3].name}
              src={artistsData?.items[3].images[0].url}
            />
            <Avatar
              boxSize="5rem"
              name={artistsData?.items[4].name}
              src={artistsData?.items[4].images[0].url}
            />
          </SimpleGrid>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Text fontSize="1.5rem" fontWeight="bold">
        My most listened
        <Text as="span" color="green.600" ml="0.5rem">
          songs
        </Text>
      </Text>

      <Flex mt="0.5rem">
        <SimpleGrid columns={2}>
          <Avatar
            boxSize="5rem"
            name={tracksData?.items[1].name}
            src={tracksData?.items[1].album.images[0].url}
          />
          <Avatar
            boxSize="5rem"
            name={tracksData?.items[2].name}
            src={tracksData?.items[2].album.images[0].url}
          />
          <Avatar
            boxSize="5rem"
            name={tracksData?.items[3].name}
            src={tracksData?.items[3].album.images[0].url}
          />
          <Avatar
            boxSize="5rem"
            name={tracksData?.items[4].name}
            src={tracksData?.items[4].album.images[0].url}
          />
        </SimpleGrid>

        <Avatar
          boxSize="10rem"
          ml="0.5rem"
          name={tracksData?.items[0].name}
          src={tracksData?.items[0].album.images[0].url}
        />
      </Flex>

      <VStack mt="1rem">
        <SongsListItem>{tracksData?.items[0].name}</SongsListItem>
        <SongsListItem>{tracksData?.items[1].name}</SongsListItem>
        <SongsListItem>{tracksData?.items[2].name}</SongsListItem>
        <SongsListItem>{tracksData?.items[3].name}</SongsListItem>
        <SongsListItem>{tracksData?.items[4].name}</SongsListItem>
      </VStack>
    </>
  );
}
