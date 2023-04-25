import React,{useEffect, useState} from "react";
import styled from "styled-components";
import {get} from "lodash";
import {useDispatch, useSelector} from 'react-redux';
import { useTranslation } from "react-i18next";
import dynamic from 'next/dynamic';
import FormComponent from "./FormComponent";

//We load the text is non SSR componenet so we do not have difference between serverside/client side languages(react hydration error)
const Text = dynamic(
  () => import('./shared/text'),
  { ssr: false }
);

const Main = props => {
  const dispatch = useDispatch();
  const isDesktop = useSelector(state => state.isDesktop.value);

  return (
    <MainStyle>
      <>
      <FormComponent/>
      </>
   </MainStyle>
  );
};


export const MainStyle = styled.div`

  height: calc(100% - 50px);

  top: 50px;
  position: relative;

  @media (max-width: 480px) {
      overflow: hidden;
  }

  .main-body{
    color: white;
    margin: 0 auto;
    margin-top: 50px;
    width: 100%;
    height: 100%;
    font: normal 15px tahoma,helvetica,arial,sans-serif;
    position: relative;
  }
`;
export default Main;