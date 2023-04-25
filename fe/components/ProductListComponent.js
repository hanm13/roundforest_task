import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {fetchGetProductsBySellerName} from "../api/getProductsBySellerName";
import CircularProgress from '@mui/material/CircularProgress';
import products from "../../store/slices/products";
import DeleteProductComponent from "./DeleteProductComponent";

const ProductListComponent = props => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.value);

  return (
    <ProductListComponentStyle>
        <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ASIN</th>
              <th>Locale</th>
              <th>Price</th>
              <th>Product Name</th>
              <th>Product Link</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, i) => {
              return (
                <>
                  <tr key={i}>
                    <td>{item.ASIN}</td>
                    <td>{item.Locale}</td>
                    <td>{item.Price}</td>
                    <td>{item.Product_name}</td>
                    <td>{item.Product_link}</td>
                    <td>{item.Availability ? "YES" : "NO"}</td>
                    <td><DeleteProductComponent item={item} /></td>
                  </tr>
                </>
              );
            })}
          {products.length == 0 && <tr><td>No data, please initiate a search</td></tr>}
          </tbody>
        </table>
        </div>
    </ProductListComponentStyle>
  );

};


export const ProductListComponentStyle = styled.div`

.table-container{

  margin-left: 15px;

  table {
    border: 1px solid;
    padding: 10px;
    border-radius: 25px;
    width: 650px;
  }

  th,td{
    min-width: 100px;
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
  }

  .button-delete-seller{
    background-color: red;
  }

}

`;

export default ProductListComponent;