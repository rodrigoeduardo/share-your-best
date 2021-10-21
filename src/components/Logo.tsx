import { Text } from '@chakra-ui/react';

export function Logo(props) {
  return (
    <Text fontWeight="700" {...props}>
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
