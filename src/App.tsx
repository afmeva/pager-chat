import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { GlobalStyle } from './components/GlobalStyle';
import { Chat } from './components/Chat';

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
