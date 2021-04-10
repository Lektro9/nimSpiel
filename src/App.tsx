import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { ChakraProvider } from '@chakra-ui/react';
import MainScreen from './nimgame/MainScreen';

export default function App() {
  return (
    <Router>
      <ChakraProvider>
        <Switch>
          <Route path="/" component={MainScreen} />
        </Switch>
      </ChakraProvider>
    </Router>
  );
}
