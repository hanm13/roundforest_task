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
  background-color: rgba(0,0,0, 0.8);
  color: white;
  border-bottom: 2px solid white;
  
  @media screen and (max-width: 1024px) {
    justify-content: center;
  }

  .head-logo{
    width: 260px;
    margin-left: 10px;
    margin-right: 10px;
    float: left;
  }
`;

export default Header;
;