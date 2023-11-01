const axios = require('axios');

const makeApiCall = async ({ url, method, data, headers }) => {
   const options = {
      method: method,
      url: url,
      data: data,
      headers: headers,
   };

   try {
      const response = await axios.request(options);
      return response.data;
   } catch (error) {
      console.log('error: ', error);
      throw error;
   }
};
module.exports = makeApiCall;
