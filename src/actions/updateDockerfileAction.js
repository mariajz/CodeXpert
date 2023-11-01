const vscode = require('vscode');
const TextBisonApiService = require('../service/TextBisonApiService');
const ChatCompletionsApiService = require('../service/ChatCompletionApiService');
const {
   getStringifiedPrompt,
   getHTMLContentForPrompt,
   getValueFromEnv,
   readFileContent,
} = require('../helper/helpers');
const { baseHTML } = require('../constants');
const Prompts = require('../prompts/Prompts');

const getUpdateDockerfilePrompt = content => {
   let filteredPrompt = Prompts.UPDATE_DOCKER.replace(
      '##DOCKERFILE##',
      content,
   );
   return filteredPrompt;
};

const updateDockerfileAction = () => {
   const { TextBisonApi } = TextBisonApiService();
   const { ChatCompletionApi } = ChatCompletionsApiService();

   vscode.commands.registerCommand(
      'CodeXpert.updateDockerfile',
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

         let dockerFileContent;
         try {
            dockerFileContent = await readFileContent('.dockerfile');
         } catch (err) {
            return vscode.window.showErrorMessage('No Dockerfile found');
         }

         const filteredPrompt = getUpdateDockerfilePrompt(dockerFileContent);
         const panel = vscode.window.createWebviewPanel(
            'updateDockerfilePrompt',
            'Update Dockerfile Prompt',
            vscode.ViewColumn.One,
            {},
         );
         panel.webview.html = getHTMLContentForPrompt(baseHTML, filteredPrompt);

         let inputPrompt = getStringifiedPrompt(dockerFileContent);
         const result = await selectedApi(inputPrompt);

         if (result) {
            const resultPanel = vscode.window.createWebviewPanel(
               'updateDockerfileResult',
               'Update Dockerfile Result',
               vscode.ViewColumn.One,
               {},
            );
            resultPanel.webview.html = getHTMLContentForPrompt(
               baseHTML,
               result,
            );
         }
      },
   );
};
module.exports = updateDockerfileAction;
