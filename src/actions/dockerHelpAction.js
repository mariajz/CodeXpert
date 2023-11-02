const vscode = require('vscode');
const TextBisonApiService = require('../service/TextBisonApiService');
const ChatCompletionsApiService = require('../service/ChatCompletionApiService');
const {
   getStringifiedPrompt,
   getHTMLContentForPrompt,
   getValueFromEnv,
   triggerUserInput,
   executeCommand
} = require('../helper/helpers');
const { baseHTML } = require('../constants');
const Prompts = require('../prompts/Prompts');

const getDockerHelpPrompt = diff => {
   let filteredPrompt = Prompts.DOCKER_HELP.replace('##DOCKER_HELP##', diff);
   return filteredPrompt;
};

const dockerHelpAction = () => {
   const { TextBisonApi } = TextBisonApiService();
   const { ChatCompletionApi } = ChatCompletionsApiService();

   vscode.commands.registerCommand('CodeXpert.dockerHelp', async function () {
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

      const userInput = await triggerUserInput(
         'Type anything you want to generate docker command for: eg. logs',
      );
      if (userInput != undefined) {
         let filteredPrompt = getDockerHelpPrompt(userInput);
         try {
            let running_docker_services = await executeCommand("docker ps");
            if (running_docker_services != undefined && running_docker_services != "") {
               filteredPrompt = filteredPrompt + "\n" + ' You have below running services from docker ps ' + "\n" + running_docker_services;
            }
         } catch (error) {

         }
         const panel = vscode.window.createWebviewPanel(
            'dockerHelpPrompt',
            'Docker Help Prompt',
            vscode.ViewColumn.One,
            {},
         );
         panel.webview.html = getHTMLContentForPrompt(baseHTML, filteredPrompt);
         let inputPrompt = getStringifiedPrompt(filteredPrompt);

         let result = await selectedApi(inputPrompt);

         if (result) {
            result = result.replace(/`/g, "");
            result = result.replace("\n", "");
            const resultPanel = vscode.window.createWebviewPanel(
               'dockerHelpResult',
               'Docker Command',
               vscode.ViewColumn.One,
               {},
            );

            await executeCommand(result)
               .then((stdout) => {
                  resultPanel.webview.html = getHTMLContentForPrompt(
                     baseHTML,
                     result + "\n" + stdout,
                  );
                  //vscode.window.showInformationMessage(stdout);
               })
               .catch((error )=> {
                  resultPanel.webview.html = getHTMLContentForPrompt(
                     baseHTML,
                     result,
                  );
               });


         }
      }
   });
};
module.exports = dockerHelpAction;
