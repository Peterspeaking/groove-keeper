"use client";
import HeroVinyl from "@/components/HeroVinyl";
import { Box, Image, VStack, Center, HStack, Heading, Link, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const handleCollection = () => {
    router.push("/collection");
  };

  return (
    <Center>
      <VStack w="80%" align="center">
        <HStack spacing="100px">
        <Heading as="button" onClick={handleCollection} _hover={{ textDecoration: "underline" }} >
              Collection
          </Heading>
          <Image src="/icon.png" alt="Vinyl records"/>
          <Heading>Mood</Heading>
        </HStack>
        <Box w="full" borderRadius="20px" opacity="82%">
            <HeroVinyl
            artist="Pink Floyd"
            album="The Dark Side of the Moon"
            year="1973"
            imageUrl="/dark-side-of-the-moon.png"
          />
        </Box>
      </VStack>
    </Center>
  );
}
