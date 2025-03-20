"use client";
import { Button, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const AddButton = () => {
  const router = useRouter();

  const handleAddVinyl = () => {
    router.push("/add-vinyl");
  };

  return (
    <Box
      position="fixed"
      top="20px"
      right="20px"
      zIndex={1000}
      bg="transparent"

    >
      <Button
        onClick={handleAddVinyl}
        bg="transparent"
        _hover={{ bg: "gray.100" }}
        borderRadius="full"
        w="20px"
        fontSize="50px"
      >
        +
      </Button>
    </Box>
  );
};

export default AddButton;
