"use client";

import { addVinyl } from "@/actions/actions";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

export default function AddVinylPage() {
  return (

      <Box maxW="md" mx="auto" py={8} px={4}>
        <Heading mb={6} textAlign="center">
          Add a Vinyl
        </Heading>
        <form action={addVinyl}>
        <FormControl mb={4}>
          <FormLabel>Artist</FormLabel>
          <Input type="text" name="artist" placeholder="Artist name" background="white" />
        </FormControl>
        
        <FormControl mb={4}>
          <FormLabel>Album</FormLabel>
          <Input type="text" name="album" placeholder="Album name" background="white" />
        </FormControl>
        
        <FormControl mb={4}>
          <FormLabel>Year</FormLabel>
          <Input type="number" name="year" placeholder="Release year" background="white" />
        </FormControl>
        
        <FormControl mb={4}>
          <FormLabel>Genre</FormLabel>
          <Input type="text" name="genre" placeholder="Genre" background="white" />
        </FormControl>
        
        <Button colorScheme="teal" width="full" mt={4} type="submit">
          Add to Collection
        </Button>
        </form>
      </Box>

  );
}
