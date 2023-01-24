import {
  Box,
  Button,
  ChakraProvider,
  Grid,
  ScaleFade,
  Text,
  theme,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import ProductPopup from './components/product_popup';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text>Product Popup Design Implementation</Text>
            <Button onClick={onOpen}>Open Popup</Button>

            <ScaleFade initialScale={0.9} in={isOpen} reverse={true}>
              <ProductPopup isOpen={isOpen} onClose={onClose} />
            </ScaleFade>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
