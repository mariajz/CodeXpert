const vscode = require('vscode');
const TextBisonApiService = require('./src/service/TextBisonApiService');
const TreeViewProvider = require('./src/helper/TreeViewProvider');
const {
   getFilteredPrompt,
   getStringifiedPrompt,
   generateTemplate,
} = require('./src/helper/helpers');
const { htmlContent } = require('./src/constants');
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
         const inputPrompt = getStringifiedPrompt(Prompts.CREATE_DOCKER_FILE, {
            DB_HOST: 'localhost',
            DB_USER: 'admin',
            DB_PASSWORD: 'password123',
            DB_NAME: 'my_database',
            PORT_NUMBER: 3306,
         });

         TextBisonApi(inputPrompt);
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
