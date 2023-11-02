const vscode = require('vscode');
const TextBisonApiService = require('../service/TextBisonApiService');
const ChatCompletionsApiService = require('../service/ChatCompletionApiService');
const {
   getStringifiedPrompt,
   getHTMLContentForPrompt,
   getValueFromEnv,
   readFileContent,
   triggerUserInput,
} = require('../helper/helpers');
const { baseHTML } = require('../constants');
const Prompts = require('../prompts/Prompts');

const getUpdateDockerfilePrompt = (dockerfileContent, issues = '') => {
   let filteredPrompt = Prompts.UPDATE_DOCKER.replace(
      '##DOCKERFILE##',
      dockerfileContent,
   );
   if (issues != '') {
      filteredPrompt = filteredPrompt
         .replace('##ISSUES##', Prompts.ISSUES)
         .replace('##ISSUES##', issues);
   } else {
      filteredPrompt = filteredPrompt.replace('##ISSUES##', '');
   }
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

         const issues = await triggerUserInput(
            '[optional] Enter what you want to update or any issues you faced with the dockerfile',
            true,
         );

         const filteredPrompt = getUpdateDockerfilePrompt(
            dockerFileContent,
            issues,
         );
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
