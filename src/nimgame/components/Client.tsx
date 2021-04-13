import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import net from 'net';

const client = new net.Socket();

client.on('data', (data) => {
  console.log(`Received: ${data.toString()}`);
  client.destroy(); // kill client after server's response
});

const connectToServer = () => {
  client.connect(1337, '94.114.150.175', () => {
    console.log('Connected');
    client.write('Hello, server! Love, Client.');
  });
};

const Client = () => {
  const [connected, setConnected] = useState(false);
  return (
    <div>
      <Button
        colorScheme="blue"
        m="5"
        onClick={() => {
          connectToServer();
        }}
      >
        Gegner suchen
      </Button>
    </div>
  );
};

export default Client;
