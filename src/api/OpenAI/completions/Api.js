const ApiService = require('../../ApiService');
const baseUrl = require('../BaseUrl');

class Api extends ApiService {
   constructor({ data, headers }) {
      super({
         method: 'POST',
         url: `${baseUrl}/v1/completions`,
         data: data,
         headers: headers,
      });
   }
}

module.exports = Api;
