import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import products from "../../store/slices/products";
import CircularProgress from '@mui/material/CircularProgress';
import {fetchDeleteProductByASINAndLocale} from "../api/deleteProduct";

const DeleteProductComponent = props => {
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(false);


  const deleteProduct = async (item)=>{
    setIsLoading(true);

    const response = await fetchDeleteProductByASINAndLocale(item.ASIN, item.Locale);

    if(response){
      //TODO: remove product from array of products
      dispatch(products.actions.deleteProduct(item));
    }

    setIsLoading(false);

  };

  return (
    <DeleteProductComponentStyle>

      {isLoading && <CircularProgress />}
      {!isLoading && <Button onClick={(e)=>{deleteProduct(props.item);}} className="button-delete-seller" variant="contained">DELETE</Button>}
    </DeleteProductComponentStyle>
  );

};


export const DeleteProductComponentStyle = styled.div`

    .button-delete-seller{
        background-color: red;
    }
}

`;

export default DeleteProductComponent;