const GooglePaLMApi = require('../api/Google-PaLM-api/text-bison-001/Api');
const vscode = require('vscode');
const PALM_API_KEY = require('../constants/constants');

const TextBisonApiService = () => {
   const sampleBody = {
      prompt: { text: 'create a dockerfile for a react app' },
   };

   const queryParams = {
      key: PALM_API_KEY,
   };

   const TextBisonApi = async () => {
      await new GooglePaLMApi({
         queryParams: queryParams,
         data: sampleBody,
      })
         .call()
         .then(response => {
            vscode.window.showWarningMessage(
               'response from PaLM API:',
               response.candidates[0].output,
            );
         })
         .catch(error => {
            console.log('Error in fetching data:', error);
         });
   };

   return { TextBisonApi };
};

module.exports = TextBisonApiService;
