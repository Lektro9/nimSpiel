import React, { useState } from 'react';
import { Box, Container, Button, Input } from '@chakra-ui/react';
import Server from './components/Server';
import Client from './components/Client';

// send message like this: "Name,Message"

const MainScreen = () => {
  const [chat, setChat] = useState([['nickname', 'ExampleMessage', 1]]);
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [tcpMessage, setTcpMessage] = useState('');

  const handleMessageInput = (event) => setMessage(event.target.value);
  const handleNicknameInput = (event) => setNickname(event.target.value);
  const handleSendButton = () => {
    setTcpMessage(`${nickname},${message}`);
    setMessage('');
  };

  return (
    <Container bg="tomato" p="2">
      <Input
        value={nickname}
        placeholder="Your Nickname"
        bg="white"
        onChange={handleNicknameInput}
        size="sm"
        mb="2"
      />
      <Box height="20" bg="white" border="1px" p="2" overflow="auto">
        {chat.map((msg) => {
          return (
            <div key={msg[2]}>
              {msg[0]}: {msg[1]}
            </div>
          );
        })}
      </Box>
      <Server
        messageToSend={tcpMessage}
        nickname={nickname}
        setChat={setChat}
      />
      <Client />
      <Input
        value={message}
        placeholder="Chat Input"
        bg="white"
        onChange={handleMessageInput}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSendButton();
          }
        }}
        size="sm"
      />
      <Button colorScheme="green" m="2" onClick={handleSendButton}>
        send
      </Button>
    </Container>
  );
};

export default MainScreen;
