/** 
 * 
 * This file should be loaded without SSR to avoid react-hydration error
 */

import React from "react";
import {connect} from "react-redux";

const Main = props => {
  return (
    <>{props.children}</>
  );
};

const mapToState = state => {
  return {
    isDesktop: state.isDesktop,
  };
};
export default connect(mapToState,null)(Main);