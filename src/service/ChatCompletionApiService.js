const vscode = require('vscode');
const OpenAIChatCompletionsApi = require('../api/OpenAI/chat-completions/Api');
const { generateTemplate, getValueFromEnv } = require('../helper/helpers');

const ChatCompletionApiService = () => {
   const ChatCompletionApi = async (inputPrompt, filename) => {
      const GPT_API_KEY = getValueFromEnv('GPT_API_KEY');
      const headers = {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${GPT_API_KEY}`,
      };
      const data = {
         model: 'gpt-3.5-turbo',
         messages: [
            {
               role: 'user',
               content: inputPrompt,
            },
         ],
      };
      if (!GPT_API_KEY) {
         vscode.window.showErrorMessage(
            'Please setup workspace to set GPT_API_KEY in env',
         );
      } else {
         let result;
         await new OpenAIChatCompletionsApi({
            data: data,
            headers: headers,
         })
            .call()
            .then(response => {
               if (filename) {
                  generateTemplate(
                     response.choices[0].message?.content,
                     filename,
                  );
               } else {
                  if (
                     response &&
                     response.choices &&
                     response.choices.length > 0
                  ) {
                     result = response?.choices[0]?.message?.content;
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

   return { ChatCompletionApi };
};

module.exports = ChatCompletionApiService;
