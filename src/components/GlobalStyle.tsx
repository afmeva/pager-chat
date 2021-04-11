import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  // styles reset
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  
  * {
    box-sizing: border-box;
  }
  
  // 
  p {
    margin: 0;
  }
  
  body {
    font-family: Arial,serif;
  }
  
  .root {
    width: 100%;
    height: 100%;
  }
`;
