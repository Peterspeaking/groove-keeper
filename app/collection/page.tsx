import VinylCollection from "@/components/VinylCollection";
import { prisma } from "@/lib/db";
import { Box, Heading } from "@chakra-ui/react";

export default async function CollectionPage() {
  const vinyls = await prisma.$queryRaw`
  SELECT * FROM "Vinyl"
  ORDER BY lower(regexp_replace("artist", '^the ', '', 'i')) ASC
`;

  return (
    <Box py={8} px={4}>
      <Heading mb={6} textAlign="center">
        My Vinyl Collection
      </Heading>
      <VinylCollection vinyls={vinyls} />
    </Box>
  );
}
