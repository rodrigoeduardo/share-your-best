import { Box } from '@chakra-ui/react';
import { SingleWave } from './SingleWave';

export function Waves() {
  return (
    <Box position="relative" w="100%" h="100px" bg="gray.500" overflow="hidden">
      <SingleWave
        animation="animate 10s linear infinite"
        opacity="0.5"
        zIndex="100"
      />

      <SingleWave
        animation="animate2 5s linear infinite"
        opacity="0.25"
        zIndex="99"
      />
    </Box>
  );
}
