const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const TextBisonApiService = require('./src/service/TextBisonApiService');
const TreeViewProvider = require('./src/helper/TreeViewProvider');
const { getStringifiedPrompt } = require('./src/helper/helpers');
const Prompts = require('./src/prompts/Prompts');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <link rel="stylesheet" href="app.css" />
</head>
<body>
    <script src="app.js"></script>
</body>
</html>
        `;

const { TextBisonApi } = TextBisonApiService();

const activate = async context => {
   let generateTemplateAction = vscode.commands.registerCommand(
      'CodeXpert.generateTemplate',
      async function () {
         if (!vscode.workspace || !vscode.workspace.workspaceFolders) {
            return vscode.window.showErrorMessage(
               'Please open a project folder first',
            );
         }
         let folderPath = vscode.workspace.workspaceFolders[0].uri
            .toString()
            .split(':')[1];

         folderPath = folderPath + '/CodeXpert/src/';

         fs.writeFile(path.join(folderPath, 'index.html'), htmlContent, err => {
            if (err) {
               return console.log(err);
            }
            vscode.window.showWarningMessage('Created boilerplate files!');
         });
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
