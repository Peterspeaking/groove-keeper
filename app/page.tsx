"use client";

import HeroVinyl from "@/components/HeroVinyl";
import {
  Box,
  Image,
  VStack,
  Center,
  HStack,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const router = useRouter();
  const { data } = useSWR("/api/random-vinyl", fetcher);

  const handleCollection = () => {
    router.push("/collection");
  };

  const heroVinyl = data?.vinyl;

  return (
    <Center>
      <VStack w="80%" align="center">
        <HStack spacing="100px">
          <Heading
            as="button"
            onClick={handleCollection}
            _hover={{ textDecoration: "underline" }}
          >
            Collection
          </Heading>
          <Image src="/icon.png" alt="Vinyl records" />
          <Heading>Mood</Heading>
        </HStack>
        <Box w="full" borderRadius="20px" opacity="82%">
          {heroVinyl ? (
            <HeroVinyl
              artist={heroVinyl.artist}
              album={heroVinyl.album}
              year={String(heroVinyl.year)}
              imageUrl={heroVinyl.artworkPath || "/default-artwork.png"}
            />
          ) : (
            <Center>
              <Spinner />
            </Center>
          )}
        </Box>
      </VStack>
    </Center>
  );
}
