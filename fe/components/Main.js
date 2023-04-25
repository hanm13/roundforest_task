import React,{useEffect, useState} from "react";
import styled from "styled-components";
import {get} from "lodash";
import {useDispatch, useSelector} from 'react-redux';
import { useTranslation } from "react-i18next";
import dynamic from 'next/dynamic'

//We load the text is non SSR componenet so we do not have difference between serverside/client side languages(react hydration error)
const Text = dynamic(
  () => import('./shared/text'),
  { ssr: false }
);

const Main = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isDesktop = useSelector(state => state.isDesktop.value);

  return (
    <MainStyle>
      <img src="./icons/menu.png"/>
      <div>{isDesktop ? "desktop mode" : "mobile mode"}</div>
      <Text>{t('Welcome to React')}</Text>
   </MainStyle>
  );
};


export const MainStyle = styled.div`

  height: calc(100% - 50px);

  top: 50px;
  position: relative;
  background-color: rgba(0,0,0, 0.8);

  @media (max-width: 480px) {
      overflow: hidden;
    }

  .main-body{
    background-color: rgba(0,0,0, 0.8);
    color: white;
    margin: 0 auto;
    margin-top: 50px;
    width: 80%;
    height: 100%;
    font: normal 15px tahoma,helvetica,arial,sans-serif;
    left: 5%;
    position: relative;
  }
`;
export default Main;