const GooglePaLMApi = require('../api/Google-PaLM-api/text-bison-001/Api');
const { PALM_API_KEY } = require('../constants');
const { generateTemplate } = require('../helper/helpers');

const TextBisonApiService = () => {
   const queryParams = {
      key: PALM_API_KEY,
   };

   const TextBisonApi = async inputPrompt => {
      const sampleBody = {
         prompt: { text: inputPrompt ? inputPrompt : 'Hello' },
      };

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
