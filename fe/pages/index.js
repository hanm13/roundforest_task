import React, { useEffect } from 'react';
import PageBody from '../components/PageBody';
import isDesktop from "../../store/slices/isDesktop";
import {useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';

const Index = () => {
   const dispatch = useDispatch();

   useEffect(()=>{

    if (window) {

      dispatch(isDesktop.actions.setIsDesktop(window.innerWidth >= 900));

    let isDesktopLastState = window.innerWidth >= 900;
    window.addEventListener('resize', debounce(() => {
      if (isDesktopLastState != (window.innerWidth >= 900)) {

      dispatch(isDesktop.actions.setIsDesktop(window.innerWidth >= 900));

      isDesktopLastState = !isDesktopLastState;
      }
    }, 75));
  }

   }, []);
  
  return (
   <PageBody/>
  );
};

export default Index;