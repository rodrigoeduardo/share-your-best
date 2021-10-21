import { Box } from '@chakra-ui/react';

export function SingleWave(props) {
  return (
    <Box
      position="absolute"
      bottom="0"
      left="0"
      w="100%"
      h="100px"
      bgImage="url('assets/images/wave.png')"
      bgSize="1000px 100px"
      transform="scaleY(-1)"
      {...props}
    ></Box>
  );
}
