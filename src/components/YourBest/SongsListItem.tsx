import { Text } from '@chakra-ui/react';

export function SongsListItem({ children }) {
  return (
    <Text opacity="0.7" fontWeight="medium">
      {children}
    </Text>
  );
}
