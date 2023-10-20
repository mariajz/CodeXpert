const makeApiCall = require('./ApiHelper');

class ApiService {
   constructor({ method, url, queryParams, data }) {
      this.method = method;
      this.url = url;
      this.queryParams = queryParams;
      this.data = data;
   }

   async call() {
      const urlParams = new URLSearchParams(this.queryParams);
      const queryString = urlParams.toString();
      const fullUrl = `https://${this.url}?${queryString}`;
      return await makeApiCall({
         url: fullUrl,
         method: this.method,
         data: this.data,
      });
   }
}

module.exports = ApiService;
