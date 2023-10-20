const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

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

const activate = async context => {
   let disposable = vscode.commands.registerCommand(
      'CodeXpert.generateCode',
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

   context.subscriptions.push(disposable);
};
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
