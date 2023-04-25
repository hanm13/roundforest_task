import React from 'react';
import {navigateToPage} from "../common/functions";
import { useRouter } from 'next/router';

const Unauthorized = () => {
    const router = useRouter();

  return (
    <>
   <h1>Access Denied!</h1>
   <button onClick={(e)=>{navigateToPage(router, "/")}}>Go Back</button>
   </>
  );
};

export default Unauthorized;