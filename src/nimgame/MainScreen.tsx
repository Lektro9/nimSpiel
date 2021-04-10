import React from 'react';
import { Box, Container, Button } from '@chakra-ui/react';

const MainScreen = () => {
  return (
    <Container bg="tomato">
      <Box>Here should be Chat</Box>
      <Button colorScheme="blue" m="5" onClick={() => console.log('hello')}>
        Auf Gegner warten
      </Button>
      <Button colorScheme="blue">Gegner Suchen</Button>
    </Container>
  );
};

export default MainScreen;
