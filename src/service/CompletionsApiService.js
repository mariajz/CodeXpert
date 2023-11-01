const vscode = require('vscode');
const OpenAICompletionsApi = require('../api/OpenAI/completions/Api');
const { generateTemplate, getApiKey } = require('../helper/helpers');

const CompletionsApiService = () => {
   const CompletionsApi = async (inputPrompt, filename) => {
      const GPT_API_KEY = getApiKey('GPT_API_KEY');
      const headers = {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${GPT_API_KEY}`,
      };
      const data = {
         prompt: inputPrompt ? inputPrompt : 'Hello',
         model: 'gpt-3.5-turbo-instruct',
         temperature: 0,
      };
      if (!GPT_API_KEY) {
         vscode.window.showErrorMessage(
            'Please setup workspace to set GPT_API_KEY in env',
         );
      } else {
         let result;
         await new OpenAICompletionsApi({
            data: data,
            headers: headers,
         })
            .call()
            .then(response => {
               if (filename) {
                  generateTemplate(response.choices[0].text, filename);
               } else {
                  if (
                     response &&
                     response.choices &&
                     response.choices.length > 0
                  ) {
                     result = response?.choices[0]?.text;
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

   return { CompletionsApi };
};

module.exports = CompletionsApiService;
