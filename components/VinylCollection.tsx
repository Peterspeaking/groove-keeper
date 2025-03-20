"use client";

import { useState, useMemo } from "react";
import { Flex, Input, VStack } from "@chakra-ui/react";
import VinylCard from "./VinylCard";

interface Vinyl {
  id: number;
  artist: string;
  album: string;
  year: number;
  genre: string;
  artworkPath: string;
  timesPlayed: number;
  lastPlayed: string | null;
}

interface VinylCollectionProps {
  vinyls: Vinyl[];
}

export default function VinylCollection({ vinyls }: VinylCollectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVinyls = useMemo(() => {
    if (!searchQuery) return vinyls;
    return vinyls.filter(
      (vinyl) =>
        vinyl.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vinyl.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vinyl.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vinyl.year.toString().includes(searchQuery)
    );
  }, [searchQuery, vinyls]);

  return (
    <VStack spacing={4} margin="30px">
      <Input
        width="100%"
        placeholder="Search by artist, album, genre, or year"
        background={"white"}
        color={"black"}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb={4}
      />
      <Flex wrap="wrap" justifyContent="center" gap={6}>
        {filteredVinyls.map((vinyl) => (
          <VinylCard
            key={vinyl.id}
            id={vinyl.id}
            artist={vinyl.artist}
            album={vinyl.album}
            year={String(vinyl.year)}
            imageUrl={vinyl.artworkPath}
            timesPlayed={vinyl.timesPlayed}
            lastPlayed={
              vinyl.lastPlayed ? vinyl.lastPlayed.toString() : undefined
            }
          />
        ))}
      </Flex>
    </VStack>
  );
}
