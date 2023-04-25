import React, {useEffect} from "react";
import styled from "styled-components";
import {useDispatch} from 'react-redux';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const FormComponent = props => {
  const dispatch = useDispatch();


  return (
    <FormComponentStyle>
        <div className="form-container">
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <TextField id="input-ASIN" label="ASIN" variant="outlined" placeholder="ASIN" />
            </Box>
        </div>
    </FormComponentStyle>
  );
};


export const FormComponentStyle = styled.div`

.form-container{
}

`;

export default FormComponent;