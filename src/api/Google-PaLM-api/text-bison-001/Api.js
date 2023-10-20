const ApiService = require('../../ApiService');
const baseUrl = require('../BaseUrl');

class Api extends ApiService {
   constructor({ queryParams, data }) {
      super({
         method: 'POST',
         url: `${baseUrl}text-bison-001:generateText`,
         queryParams: queryParams,
         data: data,
      });
   }
}

module.exports = Api;
