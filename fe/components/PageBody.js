import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PageBodyStyle from "./PageBody.style";


const PageBody = props => {

  return (
    <PageBodyStyle>
        <Header />
        <Main />
        <Footer />
    </PageBodyStyle>
  );
};


export default PageBody;