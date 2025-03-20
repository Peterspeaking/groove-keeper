"use client";
import { Button, Box } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleAddVinyl = () => {
    router.push("/add-vinyl");
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <>
      {pathname !== "/" && (
        <Box
          position="fixed"
          top="20px"
          left="20px"
          zIndex={1000}
          bg="transparent"
        >
          <Button
            onClick={handleHome}
            bg="transparent"
            _hover={{ bg: "gray.100" }}
            borderRadius="full"
          >
            Home
          </Button>
        </Box>
      )}
      {pathname !== "/add-vinyl" && (
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
      )}
    </>
  );
};

export default Header;
