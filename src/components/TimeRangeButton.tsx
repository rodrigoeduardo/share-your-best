import { Button } from '@chakra-ui/react';

interface TimeRangeButtonProps {
  name: string;
  isActive?: boolean;
  changeTimeRange: (timeRange: string) => void;
}

export function TimeRangeButton({
  name,
  isActive = false,
  changeTimeRange,
}: TimeRangeButtonProps) {
  if (isActive) {
    return (
      <Button colorScheme="green" _active={{}}>
        {name}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      _hover={{
        borderColor: 'green.500',
        textColor: 'green.500',
      }}
      _active={{}}
      onClick={() => changeTimeRange(name)}
    >
      {name}
    </Button>
  );
}
