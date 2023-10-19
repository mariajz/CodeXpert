import ApiService from '../../ApiService';
import baseUrl from '../BaseUrl';

class Api extends ApiService {
   constructor({ queryParams }) {
      super({
         method: 'GET',
         url: `${baseUrl}:generateText`,
         queryParams: queryParams,
      });
   }
}

export default Api;
