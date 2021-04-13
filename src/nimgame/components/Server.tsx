import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import net from 'net';

const client = new net.Socket();

const server = net.createServer((socket) => {
  socket.write('Echo server\r\n');
  socket.on('data', (data) => {
    console.log(data.toString());
  });
});

const startServer = () => {
  server.listen(1337, '0.0.0.0');
  console.log('server startet on 1337');
};

const connectToServer = () => {
  client.connect(1337, '127.0.0.1', () => {
    console.log('Connected');
  });
};

const writeMessage = (message) => {
  client.write(message);
};

const stopServer = () => {
  server.close();
  console.log('server stopped.');
};

const Server = ({
  messageToSend,
  chat,
  setChat,
}: {
  messageToSend: any;
  chat: any;
  setChat: any;
}) => {
  const [hosted, setHosted] = useState(false);

  useEffect(() => {
    if (hosted) {
      writeMessage(messageToSend);
    }
  }, [messageToSend]);

  return (
    <div>
      <Button
        disabled={hosted}
        colorScheme="blue"
        m="5"
        onClick={() => {
          startServer();
          setHosted(true);
          connectToServer();
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
    </div>
  );
};

export default Server;
