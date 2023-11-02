const vscode = require('vscode');
const TextBisonApiService = require('../service/TextBisonApiService');
const ChatCompletionsApiService = require('../service/ChatCompletionApiService');
const {
   getFilteredPrompt,
   getStringifiedPrompt,
   getHTMLContentForPrompt,
   getUserInputs,
   extractEnvVariablesFromPrompt,
   getValueFromEnv,
} = require('../helper/helpers');
const { baseHTML } = require('../constants');
const Prompts = require('../prompts/Prompts');

const createDockerFileAction = () => {
   const { TextBisonApi } = TextBisonApiService();
   const { ChatCompletionApi } = ChatCompletionsApiService();

   vscode.commands.registerCommand(
      'CodeXpert.createDockerFile',
      async function () {
         if (!vscode.workspace || !vscode.workspace.workspaceFolders) {
            return vscode.window.showErrorMessage(
               'Please open a project folder first',
            );
         }
         const selectedApiType = getValueFromEnv('API_TYPE');
         if (selectedApiType === undefined) {
            return vscode.window.showErrorMessage('Please set an API_TYPE');
         }
         const selectedApi =
            selectedApiType === 'GPT' ? ChatCompletionApi : TextBisonApi;

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
               'createDockerFilePrompt',
               'Create Dockerfile Prompt',
               vscode.ViewColumn.One,
               {},
            );
            panel.webview.html = getHTMLContentForPrompt(
               baseHTML,
               filteredPrompt,
            );

            let inputPrompt = getStringifiedPrompt(filteredPrompt);
            selectedApi(inputPrompt, '.dockerfile');
         }
      },
   );
};
module.exports = createDockerFileAction;
