import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { HandleProgressBar } from "./ProgressBar";
import PageBodyStyle from "./PageBody.style";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '10px',
  // you can also just use 'scale'
  transition: transitions.FADE
};
 

const PageBody = props => {

  return (
    <PageBodyStyle>
     <AlertProvider template={AlertTemplate} {...options}>
        <HandleProgressBar />
        <Header />
        <Main />
        <Footer />
      </AlertProvider>
    </PageBodyStyle>
  );
};


export default PageBody;