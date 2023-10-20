import ApiService from '../../ApiService';
import baseUrl from '../BaseUrl';

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

export default Api;
