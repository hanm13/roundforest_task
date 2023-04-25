import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch} from 'react-redux';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {fetchCreateProduct} from "../api/createProduct";
import CircularProgress from '@mui/material/CircularProgress';

const FormComponent = props => {
  const dispatch = useDispatch();

  const [ASIN, setASIN] = useState("");
  const [locale, setLocale] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [price, setPrice] = useState(0);
  const [productName, setProductName] = useState("");
  const [productLink, setProductLink] = useState("");
  const [availability, setAvailability] = useState(false);

  const [isLoading,setIsLoading] = useState(false);
  const [returnMessage, setReturnMessage] = useState("");

  const onAddProduct = async (e)=>{

    //TODO: validate inputs before sending to backend

    setIsLoading(true);
    setReturnMessage("");

    const data = {
        "ASIN": ASIN,
        "Locale": locale,
        "Seller_name": sellerName,
        "Availability": availability,
        "Price": price,
        "Product_name": productName,
        "Product_link": productLink
    };

    const response = await fetchCreateProduct(data);
    if(response){
        setReturnMessage("Product Created!");
    }else{
        setReturnMessage("Server Error!");
    }

    setIsLoading(false);

  };

  const onChangeASIN = (event) => {
    setASIN(event.target.value);
  };

  const onChangeLocale = (event) => {
    setLocale(event.target.value);
  };

  const onChangeSellerName = (event) => {
    setSellerName(event.target.value);
  };

  const onChangePrice = (event) => {

    let value = event.target.value;

    if((value && isNaN(value)) || !value) {
        value = 0;
    }
    value = parseFloat(value);

    setPrice(value);
  };

  const onChangeProductName = (event) => {
    setProductName(event.target.value);
  };

  const onChangeProductLink = (event) => {
    setProductLink(event.target.value);
  };

  const onClickAvailability = (event) => {
    setAvailability(!availability);
  };

  function containsNumbers(str) {
    return /\d/.test(str);
  }

  return (
    <FormComponentStyle>
        <div className="form-container">
            <h2>Create new product</h2>
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
                <TextField onChange={onChangeASIN} value={ASIN} className="product-input" id="input-ASIN" label="ASIN" variant="outlined" placeholder="Please enter Amazon ID" />
                <TextField onChange={onChangeLocale} value={locale} className="product-input" id="input-Locale" label="Locale" variant="outlined" placeholder="Please enter 'Locale'" />
                <TextField onChange={onChangeSellerName} value={sellerName} className="product-input" id="input-Seller-Name" label="Seller Name" variant="outlined" placeholder="Please enter 'Seller Name'" />
                <TextField onChange={onChangePrice} value={price} className="product-input" id="input-Price" label="Price" variant="outlined" placeholder="Please enter product price" />
                <TextField onChange={onChangeProductName} value={productName} className="product-input" id="input-Product-Name" label="Product Name" variant="outlined" placeholder="Please enter 'Product Name'" />
                <TextField onChange={onChangeProductLink} value={productLink} className="product-input" id="input-Product-Link" label="Product Link" variant="outlined" placeholder="Please enter 'Product Link'" />
                <FormControlLabel control={<Switch onClick={onClickAvailability} value={availability} />} label="Availability" />
            </FormGroup>
            </Box>
            <div className="button-add-product-container">
                <Button onClick={(e)=>{onAddProduct(e);}} className="button-add-product" variant="contained">Add Product</Button>
            </div>
            { returnMessage && !isLoading && <span className="return-message">{returnMessage}</span> }
            { isLoading && <CircularProgress /> }
        </div>
    </FormComponentStyle>
  );

};


export const FormComponentStyle = styled.div`

.form-container{
    margin-right: 15px;
    display: flex;
    border: 1px solid black;
    width: 500px;
    justify-content: center;
    flex-direction: column;

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

    .button-add-product-container{

        display: flex;
        justify-content: center;
        
        .button-add-product{
            margin-bottom: 15px;
            width: 150px;
        }
    }

    .return-message{
        text-align: center;
    }

}

`;

export default FormComponent;