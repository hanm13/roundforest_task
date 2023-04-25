import React, {useEffect} from "react";
import styled from "styled-components";
import {useDispatch} from 'react-redux';

const Footer = props => {
  const dispatch = useDispatch();


  return (
    <FooterStyle>
        <footer>
          <p>©</p>
        </footer>
    </FooterStyle>
  );
};


export const FooterStyle = styled.div`
font-family: 'Open Sans Condensed', sans-serif;
position: fixed;
background-color: rgba(0,0,0, 0.8);
color: white;
width: 100%;
text-align: center;
bottom: 0px;
left: 0px;
`;

export default Footer;