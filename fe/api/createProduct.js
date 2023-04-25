import axios from "axios";

const fetchCreateProduct = async (data) =>{

    const url = `http://localhost:3001/api/v1/seller-products`;

    try{
        const response = await axios(url, {
            method: 'post',
            timeout: 1000,
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          });
          return response;
    }catch(e){
        console.log(`fetchCreateProduct failed, err: ${e.message}`);
        return null;
    }

};

module.exports = {fetchCreateProduct};