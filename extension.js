const vscode = require('vscode');
const TextBisonApiService = require('./src/service/TextBisonApiService');
const TreeViewProvider = require('./src/helper/TreeViewProvider');
const {
   getFilteredPrompt,
   getStringifiedPrompt,
   generateTemplate,
   getHTMLContentForPrompt,
} = require('./src/helper/helpers');
const { htmlContent, baseHTML } = require('./src/constants');
const Prompts = require('./src/prompts/Prompts');

const { TextBisonApi } = TextBisonApiService();
let validValues = {
   DB_HOST: null,
   DB_USER: null,
   DB_PASSWORD: null,
   DB_NAME: null,
   PORT_NUMBER: null,
};
const properties = Object.keys(validValues);

const getNextInput = async index => {
   if (index >= properties.length) {
      console.log(validValues);
      return validValues;
   }

   const propertyName = properties[index];

   const text = await vscode.window.showInputBox({
      placeHolder: propertyName,
      validateInput: text => {
         const regex = /^\d+$/;
         const isValid = regex.test(text);
         if (isValid) {
            validValues[propertyName] = text;
         }
         return isValid ? null : 'Invalid input';
      },
   });

   if (text !== undefined) {
      await getNextInput(index + 1);
   } else {
      vscode.window.showErrorMessage(
         'Input sequence cancelled, terminating...',
      );
      return undefined;
   }
   return validValues;
};

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

         const output = await getNextInput(0);
         if (output != undefined) {
            const filteredPrompt = getFilteredPrompt(
               Prompts.CREATE_DOCKER_FILE,
               {
                  DB_HOST: 'localhost',
                  DB_USER: 'admin',
                  DB_PASSWORD: 'password123',
                  DB_NAME: 'my_database',
                  PORT_NUMBER: 3306,
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
