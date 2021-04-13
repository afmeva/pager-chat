import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import { Login } from './pages/Login';
import { Chat } from './pages/Chat';
import { GlobalStyle } from './components/GlobalStyle';

import './_redirects?raw';

const App = () => {
  const [username, setUsername] = useState('');
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Route exact path="/">
          <Login onSubmit={setUsername} />
        </Route>
        <Route path="/chat">
          {username ? <Chat username={username} /> : <Redirect to="/" />}
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </BrowserRouter>
    </>
  );
};

ReactDom.render(<App />, document.querySelector('.root'));
