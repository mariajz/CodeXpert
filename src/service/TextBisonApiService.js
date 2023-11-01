const vscode = require('vscode');
const GooglePaLMApi = require('../api/Google-PaLM-api/text-bison-001/Api');
const { generateTemplate, getApiKey } = require('../helper/helpers');

const TextBisonApiService = () => {
   const TextBisonApi = async (inputPrompt, filename) => {
      const PALM_API_KEY = getApiKey('PALM_API_KEY');
      const queryParams = {
         key: PALM_API_KEY,
      };
      const sampleBody = {
         prompt: { text: inputPrompt ? inputPrompt : 'Hello' },
      };
      if (!PALM_API_KEY) {
         vscode.window.showErrorMessage('Api key not found!');
      } else {
         let result;
         await new GooglePaLMApi({
            queryParams: queryParams,
            data: sampleBody,
         })
            .call()
            .then(response => {
               if (filename) {
                  generateTemplate(
                     response.candidates[0].output.replace(/^```|```$/g, ''),
                     filename,
                  );
               } else {
                  if (
                     response &&
                     response.candidates &&
                     response.candidates.length > 0
                  ) {
                     result = response?.candidates[0]?.output;
                     vscode.window.showInformationMessage(result);
                  } else {
                     vscode.window.showErrorMessage(
                        'Empty response returned from API',
                     );
                     result = '';
                  }
               }
            })
            .catch(error => {
               console.log('Error in fetching data:', error);
               vscode.window.showErrorMessage(
                  error.response.data.error.message || 'Something went wrong!',
               );
            });
         return result;
      }
   };

   return { TextBisonApi };
};

module.exports = TextBisonApiService;
