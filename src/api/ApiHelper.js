import axios from 'axios';

const makeApiCall = async ({ url, method, data }) => {
   const options = {
      method: method,
      url: url,
      data: data,
   };

   try {
      const response = await axios.request(options);
      return response.data;
   } catch (error) {
      console.log('error: ', error);
      throw error;
   }
};

export { makeApiCall };
