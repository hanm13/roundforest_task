import axios from "axios";

const fetchGetProductsBySellerName = async (seller_name) =>{

    const url = `http://localhost:3001/api/v1/seller-products/get-all-by-seller-name?Seller_name=${seller_name}`;

    try{
        const response = await axios(url, {
            method: 'get',
            timeout: 1000,
            headers: {
              "Content-Type": "application/json",
            },
          });
          return response;
    }catch(e){
        console.log(`fetchGetProductsBySellerName failed, err: ${e.message}`);
        return null;
    }

};

module.exports = {fetchGetProductsBySellerName};