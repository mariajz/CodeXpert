const vscode = require('vscode');
const TextBisonApiService = require('../service/TextBisonApiService');
const {
   getFilteredPrompt,
   getStringifiedPrompt,
   getHTMLContentForPrompt,
   getUserInputs,
   extractEnvVariablesFromPrompt,
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

         const envVariableList = extractEnvVariablesFromPrompt(
            Prompts.CREATE_DOCKER_FILE,
         );
         const values = await getUserInputs(envVariableList);
         if (values != undefined) {
            const filteredPrompt = getFilteredPrompt(
               Prompts.CREATE_DOCKER_FILE,
               values,
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
