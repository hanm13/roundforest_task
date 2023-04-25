import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
  body {
    height: 100%;
    font-weight: 500;
    padding:0;
    margin:0;
    font-kerning: none;

    background-repeat: no-repeat;
    background-attachment: fixed;
    font: normal 18px tahoma,helvetica,arial,sans-serif;
    background-size: 100% 100%;
  }
  

  html {
    height: 100%;
    #__next {
      height: 100%;
    }
  }

  *, *::before, *::after {
      box-sizing: inherit;
  }

  #__next {
    min-height: 100vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

`;

export { GlobalStyle };