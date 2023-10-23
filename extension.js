const vscode = require('vscode');
const TextBisonApiService = require('./src/service/TextBisonApiService');
const TreeViewProvider = require('./src/helper/TreeViewProvider');
const {
   getFilteredPrompt,
   getStringifiedPrompt,
   generateTemplate,
   getHTMLContentForPrompt,
   getUserInput,
} = require('./src/helper/helpers');
const { htmlContent, baseHTML } = require('./src/constants');
const Prompts = require('./src/prompts/Prompts');

const { TextBisonApi } = TextBisonApiService();

const activate = async context => {
   let generateTemplateAction = vscode.commands.registerCommand(
      'CodeXpert.generateTemplate',
      async function () {
         generateTemplate(htmlContent, 'index.html');
      },
   );

   let callPaLMApiDefaultAction = vscode.commands.registerCommand(
      'CodeXpert.callPaLMApi',
      async function () {
         if (!vscode.workspace || !vscode.workspace.workspaceFolders) {
            return vscode.window.showErrorMessage(
               'Please open a project folder first',
            );
         }
         TextBisonApi();
      },
   );

   let createDockerFileAction = vscode.commands.registerCommand(
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

   let treeViewProvider = new TreeViewProvider(context);
   vscode.window.registerTreeDataProvider('codexpert', treeViewProvider);

   context.subscriptions.push(generateTemplateAction);
   context.subscriptions.push(callPaLMApiDefaultAction);
   context.subscriptions.push(createDockerFileAction);
};
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
