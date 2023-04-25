import React from "react";

const ColorParams = {
    
    //these parameters are used in replace of hardcoded color
    //uses: font, border, background, box shadow
    
    //for accessibility purposes, ensure that the contrast between background and foreground have the radio of: 3:5:1
    
    //variations of white:
    white: '#fff',
    whiteTransparent : "rgba(255, 255, 255, 0.5)",
    darkWhite: '#f8f8f8',
    
    //variations of gray:
    
    //used for backgrounds and disabled buttons
    veryLightGrayTransparent : 'rgba(234,234,234,0.5)',
    veryLightGray: '#eaeaea',
    lightGray: '#cacaca',
    gray: '#b9b9b9',
    mediumGray: '#9595a0',
    //color used for fonts

    blueGray: '#697682',
    darkGray: '#3d3d42',
    darkBlueGray: '#37374e',
    veryDarkGray: '#313131',
    veryDarkGrayTransparent:"rgba(46, 48, 51, 0.09)",
    
    //variations of black:
    
    lightBlack: '#212121',
    black: '#000',
    
    //variations of purple/violet:
    
    //background colors:
    
    veryLightPurple: '#ecebff',
    lighterPurple: '#e2e0ff',
    lightPurple: '#dcd5ff',
    lightViolet: '#bfb3fa',
    violet: '#a291f7',
    //font colors
    darkViolet: '#9370db',
    purple: '#684eed',
    //variations of yellow:
    //background colors
    lightYellow: '#ffe47f',
    yellow: '#ffd028',
    //warning/error color
    red: '#e83434',
    orange: '#e67e22',
    green:'#008000'
    
};


export default ColorParams;