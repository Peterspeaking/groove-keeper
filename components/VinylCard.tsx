"use client";

import { useState } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  Spacer,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

interface VinylCardProps {
  id: number;
  artist: string;
  album: string;
  year: string;
  imageUrl: string;
  timesPlayed?: number;
  lastPlayed?: string;
}

export default function VinylCard({
  id,
  artist,
  album,
  year,
  imageUrl,
  timesPlayed = 0,
  lastPlayed,
}: VinylCardProps) {
  const [playCount, setPlayCount] = useState<number>(timesPlayed);
  const [lastPlayedState, setLastPlayedState] = useState<string | undefined>(
    lastPlayed
  );

  const formattedLastPlayed = lastPlayedState
    ? `Last played on ${new Date(lastPlayedState).toLocaleDateString()}`
    : "Never played";

  const handlePlay = async () => {
    try {
      const response = await fetch("/api/update-play", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vinylId: id }),
      });
      const data = await response.json();
      if (response.ok) {
        // Update local state with the returned vinyl record
        setPlayCount(data.vinyl.timesPlayed);
        setLastPlayedState(data.vinyl.lastPlayed);
      } else {
        console.error("Failed to update play count:", data.error);
      }
    } catch (error) {
      console.error("Error updating play:", error);
    }
  };

  return (
    <Box
      position="relative"
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

        <VStack align="flex-start" spacing={2} flex="1">
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
              Played {playCount} {playCount === 1 ? "time" : "times"}
            </Badge>
            <Badge colorScheme="blue">{formattedLastPlayed}</Badge>
          </Flex>
        </VStack>
      </Flex>
      <IconButton
        aria-label="Increment play count"
        icon={<AddIcon />}
        onClick={handlePlay}
        position="absolute"
        bottom="10px"
        right="10px"
      />
    </Box>
  );
}
