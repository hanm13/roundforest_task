import React, {useEffect} from "react";
import styled from "styled-components";
import {useDispatch} from 'react-redux';
import {get} from "lodash";

const Header = props => {
  const dispatch = useDispatch();

  return (
    <HeaderStyle>
    </HeaderStyle>
  );
};


export const HeaderStyle = styled.div`

  display: flex;
  width: 100%;
  top: 0px;
  left: 0px;
  z-index: 1;
  font-family: 'Open Sans Condensed', sans-serif;
  position: fixed;
  height: 50px;
  color: white;
  
  @media screen and (max-width: 1024px) {
    justify-content: center;
  }

`;

export default Header;
;