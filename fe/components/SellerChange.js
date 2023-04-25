import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch} from 'react-redux';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {fetchGetProductsBySellerName} from "../api/getProductsBySellerName";
import CircularProgress from '@mui/material/CircularProgress';
import products from "../../store/slices/products";

const SellerChange = props => {
  const dispatch = useDispatch();


  const [sellerName, setSellerName] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [returnMessage, setReturnMessage] = useState("");

  const onAddProduct = async (e)=>{

    setIsLoading(true);

    const response = await fetchGetProductsBySellerName(sellerName);
    if(response){
      dispatch(products.actions.setProducts(response.data.data));
      setReturnMessage("");
    }else{
      setReturnMessage("Server Error!");
    }

    setIsLoading(false);

  };

  const onChangeSellerName = (event) => {
    setSellerName(event.target.value);
  };

  return (
    <SellerChangeStyle>
        <div className="form-container">
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '500px' },
                "justifyContent": "center",
                "display": "flex",
                "flexDirection": "column",
                "alignItems": "center",
            }}
            noValidate
            autoComplete="off"
            >
            <FormGroup className="form-group">
                <TextField onChange={onChangeSellerName} value={sellerName} className="product-input" id="input-Seller-Name" label="Seller Name" variant="outlined" placeholder="Please enter 'Seller Name'" />
            </FormGroup>
            </Box>
            <div className="button-search-seller-container">
                <Button onClick={(e)=>{onAddProduct(e);}} className="button-search-seller" variant="contained">Change Seller</Button>
            </div>
            { returnMessage && !isLoading && <span className="return-message">{returnMessage}</span> }
            { isLoading && <CircularProgress /> }
        </div>
    </SellerChangeStyle>
  );

};


export const SellerChangeStyle = styled.div`

.form-container{
    display: flex;
    width: 500px;
    justify-content: center;
    flex-direction: row;

    h2{
        align-items: center;
        text-align: center;
    }

    .product-input{
        max-width: 300px;
        margin-bottom: 15px;
    }

    .form-group{
        display:flex;
        justify-content: center;
        align-items: center;
    }

    .button-search-seller-container{

        display: flex;
        justify-content: center;
        
        .button-search-seller{
            margin-bottom: 15px;
            width: 150px;
        }
    }

    .return-message{
        text-align: center;
    }

}

`;

export default SellerChange;