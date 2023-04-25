import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
}
  body {
    height: 100%;
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 0.2px;
    padding:0;
    margin:0;
    font-kerning: none;

    background-repeat: no-repeat;
    color: white;
    background-attachment: fixed;
    font: normal 18px tahoma,helvetica,arial,sans-serif;
    background-size: 100% 100%;
  }

  *::-webkit-scrollbar {
    width: 0.6em;

  }
  
  *::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(0,0,0,0.8);

    @media (max-width: 480px) {
      background-color: #585858;
    }
  };
    
  }
  
  *::-webkit-scrollbar-thumb {
    background-color: rgb(0, 0, 0);
    outline: 1px solid slategrey;
    opacity: 0.6;

    @media (max-width: 480px) {
      background-color: #5b1212;
      outline: 1px solid #585858;
    }
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