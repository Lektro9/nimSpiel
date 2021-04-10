import React, { useState } from 'react';
import { Box, Container, Button } from '@chakra-ui/react';
import net from 'net';

const server = net.createServer(function (socket) {
  socket.write('Echo server\r\n');
  socket.on('data', (data) => {
    console.log(data.toString());
  });
});

const startServer = () => {
  server.listen(1337, '127.0.0.1');
  console.log('server startet on 1337');
};

const stopServer = () => {
  server.close();
  console.log('server stopped.');
};

const client = new net.Socket();

client.on('data', (data) => {
  console.log(`Received: ${data.toString()}`);
  client.destroy(); // kill client after server's response
});

const connectToServer = () => {
  client.connect(1337, '127.0.0.1', () => {
    console.log('Connected');
    client.write('Hello, server! Love, Client.');
  });
};

const MainScreen = () => {
  const [hosted, setHosted] = useState(false);
  return (
    <Container bg="tomato">
      <Box>Here should be Chat</Box>
      <Button
        disabled={hosted}
        colorScheme="blue"
        m="5"
        onClick={() => {
          startServer();
          setHosted(true);
        }}
      >
        Auf Gegner warten
      </Button>
      <Button
        disabled={!hosted}
        colorScheme="red"
        onClick={() => {
          stopServer();
          setHosted(false);
        }}
      >
        Server stoppen
      </Button>
      <Button
        colorScheme="blue"
        m="5"
        onClick={() => {
          connectToServer();
        }}
      >
        Gegner suchen
      </Button>
    </Container>
  );
};

export default MainScreen;
