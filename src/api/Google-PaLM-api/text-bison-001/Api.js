const ApiService = require('../../ApiService');
const baseUrl = require('../BaseUrl');

class Api extends ApiService {
   constructor({ queryParams, data }) {
      super({
         method: 'GET',
         url: `${baseUrl}:generateText`,
         queryParams: queryParams,
         data: data,
      });
   }
}

module.exports = Api;
