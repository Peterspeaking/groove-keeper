import VinylCard from "@/components/VinylCard";
import { prisma } from "@/lib/db";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { Key } from "react";

export default async function CollectionPage() {
  const vinyls = await prisma.vinyl.findMany();

  return (
    <Box py={8} px={4}>
      <Heading mb={6} textAlign="center">
        My Vinyl Collection
      </Heading>

      <VStack spacing={6} align="center">
        {vinyls?.map((vinyl: { id: Key | null | undefined; artist: string; album: string; year: number; artworkPath: string; timesPlayed: number; lastPlayed: { toString: () => string; }; }) => (
          <VinylCard
            key={vinyl.id}
            artist={vinyl.artist}
            album={vinyl.album}
            year={String(vinyl.year)}
            imageUrl={vinyl.artworkPath}
            timesPlayed={vinyl.timesPlayed ?? 0}
            lastPlayed={vinyl.lastPlayed ? vinyl.lastPlayed.toString() : undefined}
          />
        ))}
      </VStack>
    </Box>
  );
}
