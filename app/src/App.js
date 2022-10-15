import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Text>test</Text>
          </VStack>
        </Grid>
      </Box>
    </>
  );
}

export default App;
