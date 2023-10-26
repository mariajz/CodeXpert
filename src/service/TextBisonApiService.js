const vscode = require('vscode');
const GooglePaLMApi = require('../api/Google-PaLM-api/text-bison-001/Api');
const { generateTemplate } = require('../helper/helpers');
const dotenv = require('dotenv');

const TextBisonApiService = () => {
   const TextBisonApi = async (inputPrompt, filename) => {
      let folderPath = vscode.workspace.workspaceFolders[0].uri
         .toString()
         .split(':')[1];

      folderPath = folderPath + '/.env';
      dotenv.config({ path: folderPath });

      const PALM_API_KEY = process.env.PALM_API_KEY;
      const queryParams = {
         key: PALM_API_KEY,
      };

      const sampleBody = {
         prompt: { text: inputPrompt ? inputPrompt : 'Hello' },
      };
      if (!PALM_API_KEY) {
         vscode.window.showErrorMessage('Invalid api key!');
      } else {
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
                  vscode.window.showInformationMessage(
                     response.candidates[0].output,
                  );
               }
            })
            .catch(error => {
               console.log('Error in fetching data:', error);
            });
      }
   };

   return { TextBisonApi };
};

module.exports = TextBisonApiService;
