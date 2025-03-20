import { Heading, Text, Image, Button, Stack, Flex } from "@chakra-ui/react";

interface HeroVinylProps {
  artist: string;
  album: string;
  year: string;
  imageUrl: string;
}

export default function HeroVinyl({
  artist,
  album,
  year,
  imageUrl,
}: HeroVinylProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bgGradient="linear(to-r, gray.700, gray.900)"
      color="white"
      p={10}
      borderRadius="md"
      boxShadow="lg"
      maxW="800px"
      mx="auto"
      my={8}
    >
      <Heading color="#3F70C0" fontSize="50px" mb={6}>
        Daily Recommended Spin
      </Heading>
      <Image
        src={imageUrl}
        alt={`${album} cover`}
        boxSize={{ base: "300px", md: "400px" }}
        objectFit="cover"
        borderRadius="md"
        mb={6}
      />
      <Stack spacing={4} align="center" textAlign="center">
        <Heading size="lg" fontWeight="bold">
          {album}
        </Heading>
        <Text fontSize="lg">{artist}</Text>
        <Text fontSize="md" color="gray.300">
          Released: {year}
        </Text>
        <Button colorScheme="teal" mt={4}>
          Listen Now
        </Button>
      </Stack>
    </Flex>
  );
}
