import React from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  VStack,
  Grid,
  Button,
  theme,
} from '@chakra-ui/react';
import Pattern from './components/Pattern';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Heading as="h1" size="4xl">Our Bond Touch Dictionary</Heading>
            <Text fontSize="smaller" color="GrayText" maxW="75%">
              A simple web application that allows us to add patterns and meanings to our bond touch dictionary.
            </Text>
            <Button colorScheme="blue" size="lg">
              Add a Pattern
            </Button>
          </VStack>
        </Grid>
        <VStack minH="25vh" p={8} spacing={8}>
          <Pattern pattern={[1000, 21, 1000, 30, 3000]} meaning="I love you" />
          <Pattern pattern={[2300, 21, 2300, 30, 2500]} meaning="I miss you" />
          <Pattern pattern={[2000, 21, 1000, 30, 1000, 20, 2000]} meaning="Ich liebe dich" />
        </VStack>
      </Box>
    </ChakraProvider>
  )
}

export default App;
