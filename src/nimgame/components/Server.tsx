import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import net from 'net';

const client = new net.Socket();

const connectToServer = () => {
  client.connect(1337, '127.0.0.1', () => {
    console.log('Connected');
  });
};

const Server = ({
  messageToSend,
  setChat,
}: {
  messageToSend: string;
  setChat: React.Dispatch<React.SetStateAction<(string | number)[][]>>;
}) => {
  const [hosted, setHosted] = useState(false);

  const receiveHandler = (receivedData: string) => {
    setChat((oldChat) => {
      const splittedData = receivedData.split(',');
      return [
        [splittedData[0], splittedData[1], new Date().getTime()],
        ...oldChat,
      ];
    });
  };

  const server = net.createServer((socket) => {
    socket.write('Echo server\r\n');
    socket.on('data', (data) => {
      receiveHandler(data.toString());
    });
  });

  const startServer = () => {
    server.listen(1337, '0.0.0.0');
    console.log('server startet on 1337');
  };

  const stopServer = () => {
    server.close();
    console.log('server stopped.');
  };

  const writeMessage = (message: string) => {
    client.write(message);
  };

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
