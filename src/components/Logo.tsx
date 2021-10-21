import { Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <Text fontSize="6rem" fontWeight="700">
      share your
      <Text as="span" ml="0.8rem" color="green.600">
        best
      </Text>
      <Text as="span" ml="0.2rem">
        !
      </Text>
    </Text>
  );
}
