import axios from "axios";

const fetchDeleteProductByASINAndLocale = async (ASIN, Locale) =>{

    const url = `http://localhost:3001/api/v1/seller-products`;

    try{
        const response = await axios(url, {
            method: 'delete',
            timeout: 1000,
            headers: {
              "Content-Type": "application/json",
            },
            data:[{ASIN, Locale}]
          });
          return response;
    }catch(e){
        console.log(`fetchDeleteProductByASINAndLocale failed, err: ${e.message}`);
        return null;
    }

};

module.exports = {fetchDeleteProductByASINAndLocale};