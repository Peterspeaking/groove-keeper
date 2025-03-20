import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  Spacer,
  VStack,
} from "@chakra-ui/react";

interface VinylCardProps {
  artist: string;
  album: string;
  year: string;
  imageUrl: string;
  timesPlayed?: number;
  lastPlayed?: string;
}

export default function VinylCard({
  artist,
  album,
  year,
  imageUrl,
  timesPlayed = 0,
  lastPlayed,
}: VinylCardProps) {
  const formattedLastPlayed = lastPlayed
    ? `Last played on ${new Date(lastPlayed).toLocaleDateString()}`
    : "Never played";

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p={4}
      bg="white"
      _dark={{ bg: "gray.800" }}
      width="100%"
      maxWidth="600px"
    >
      <Flex>
        <Image
          src={imageUrl}
          alt={`${album} cover`}
          boxSize="150px"
          objectFit="cover"
          borderRadius="md"
          mr={4}
        />

        <VStack align="flex-start" spacing={2}>
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: "gray.100" }}
          >
            {artist}
          </Text>
          <Text fontSize="md" color="gray.600" _dark={{ color: "gray.300" }}>
            {album}
          </Text>
          <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
            {year}
          </Text>
          <Spacer />

          <Flex mt={2} paddingBottom="10px">
            <Badge colorScheme="green" mr={2}>
              Played {timesPlayed} {timesPlayed === 1 ? "time" : "times"}
            </Badge>
            <Badge colorScheme="blue">{formattedLastPlayed}</Badge>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
}
