import React from 'react';
import TopBarProgress from "react-topbar-progress-indicator";
import { connect } from 'react-redux';

TopBarProgress.config({
  barColors: {
    "0": "#4f2525",
    "0.5": "#4f2525",
    "1.0": "#4f2525",

  },
    shadowBlur: 0,
    barThickness: 4
});


export class ProgressBar extends React.Component {

  render() {
		
    const { progressBarStatus } = this.props;
		
    if(progressBarStatus) {
      return(<TopBarProgress/>)
    } else {
      return('');
    }
  }
}

//redux container component
const mapStateToProps = (state) => {
  return({
    progressBarStatus: state.progressBarStatus
  });
};

export const HandleProgressBar = connect(
  mapStateToProps,
  null
)(ProgressBar);

export default HandleProgressBar;