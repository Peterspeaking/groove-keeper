import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'BoecklinsUniverse', sans-serif",
    body: "'BoecklinsUniverse', sans-serif",
  },
  components: {
    Input: {
      baseStyle: {
        fontFamily: "'BoecklinsUniverse', sans-serif",
      },
    },
  },
});

export default theme;
