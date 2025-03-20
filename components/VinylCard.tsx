"use client";

import { useState } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  VStack,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

interface VinylCardProps {
  id: number;
  artist: string;
  album: string;
  year: string;
  genre: string;
  imageUrl: string;
  timesPlayed?: number;
  lastPlayed?: string;
}

export default function VinylCard({
  id,
  artist,
  album,
  year,
  genre,
  imageUrl,
  timesPlayed = 0,
  lastPlayed,
}: VinylCardProps) {
  const [playCount, setPlayCount] = useState<number>(timesPlayed);
  const [lastPlayedState, setLastPlayedState] = useState<string | undefined>(
    lastPlayed
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <>
      <Box
        onClick={onOpen}
        cursor="pointer"
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
            <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
              {genre}
            </Text>
            <Flex mt={2}>
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
          onClick={(e) => {
            e.stopPropagation(); // prevent modal from opening when clicking the button
            handlePlay();
          }}
          position="absolute"
          bottom="10px"
          right="10px"
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="white" _dark={{ bg: "gray.800" }} color="gray.800">
          <ModalHeader>
            {artist} - {album}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src={imageUrl}
              alt={`${album} cover`}
              width="100%"
              borderRadius="md"
              mb={4}
            />
            <Text>
              <strong>Year:</strong> {year}
            </Text>
            <Text>
              <strong>Genres:</strong> {genre}
            </Text>
            <Text>
              <strong>Played:</strong> {playCount}{" "}
              {playCount === 1 ? "time" : "times"}
            </Text>
            <Text>
              <strong>Last Played:</strong>{" "}
              {lastPlayedState
                ? new Date(lastPlayedState).toLocaleDateString()
                : "Never played"}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handlePlay} leftIcon={<AddIcon />}>
              Play
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
