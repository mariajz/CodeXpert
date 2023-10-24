const vscode = require('vscode');
const TextBisonApiService = require('../service/TextBisonApiService');
const {
   getFilteredPrompt,
   getStringifiedPrompt,
   getHTMLContentForPrompt,
   getUserInput,
} = require('../helper/helpers');
const { baseHTML } = require('../constants');
const Prompts = require('../prompts/Prompts');

const createDockerFileAction = () => {
   const { TextBisonApi } = TextBisonApiService();

   vscode.commands.registerCommand(
      'CodeXpert.createDockerFile',
      async function () {
         if (!vscode.workspace || !vscode.workspace.workspaceFolders) {
            return vscode.window.showErrorMessage(
               'Please open a project folder first',
            );
         }

         const output = await getUserInput(0);
         if (output != undefined) {
            const filteredPrompt = getFilteredPrompt(
               Prompts.CREATE_DOCKER_FILE,
               {
                  DB_HOST: output.DB_HOST,
                  DB_USER: output.DB_USER,
                  DB_PASSWORD: output.DB_PASSWORD,
                  DB_NAME: output.DB_NAME,
                  PORT_NUMBER: output.PORT_NUMBER,
               },
            );

            const panel = vscode.window.createWebviewPanel(
               'samplePrompt',
               'Sample Prompt',
               vscode.ViewColumn.One,
               {},
            );
            panel.webview.html = getHTMLContentForPrompt(
               baseHTML,
               filteredPrompt,
            );

            let inputPrompt = getStringifiedPrompt(filteredPrompt);
            TextBisonApi(inputPrompt, '.dockerfile');
         }
      },
   );
};
module.exports = createDockerFileAction;
