import React, { useState } from 'react';
import { Box, Container, Button, Input } from '@chakra-ui/react';
import Server from './components/Server';
import Client from './components/Client';

// send message like this: "Name,Message"

const MainScreen = () => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [tcpMessage, setTcpMessage] = useState('');

  const handleMessageInput = (event) => setMessage(event.target.value);
  const handleNicknameInput = (event) => setNickname(event.target.value);

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
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
      </Box>
      <Server messageToSend={tcpMessage} chat={chat} setChat={setChat} />
      <Client />
      <Input
        value={message}
        placeholder="Chat Input"
        bg="white"
        onChange={handleMessageInput}
        size="sm"
      />
      <Button
        colorScheme="green"
        m="2"
        onClick={() => {
          setTcpMessage(`${nickname},${message}`);
          setMessage('');
        }}
      >
        send
      </Button>
    </Container>
  );
};

export default MainScreen;
