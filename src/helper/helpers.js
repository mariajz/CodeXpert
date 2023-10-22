const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

const getFilteredPrompt = (prompt, values) => {
   const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT_NUMBER } = values;

   const filteredPrompt = prompt
      .replace(/DB_HOST/g, DB_HOST)
      .replace(/DB_USER/g, DB_USER)
      .replace(/DB_PASSWORD/g, DB_PASSWORD)
      .replace(/DB_NAME/g, DB_NAME)
      .replace(/PORT_NUMBER/g, PORT_NUMBER);

   return filteredPrompt;
};

const getStringifiedPrompt = prompt => {
   const stringifiedPrompt = JSON.stringify(prompt);

   return stringifiedPrompt;
};

const generateTemplate = (content, filename) => {
   if (!vscode.workspace || !vscode.workspace.workspaceFolders) {
      return vscode.window.showErrorMessage(
         'Please open a project folder first',
      );
   }
   let folderPath = vscode.workspace.workspaceFolders[0].uri
      .toString()
      .split(':')[1];

   folderPath = folderPath + '/CodeXpert/';

   fs.writeFile(path.join(folderPath, filename), content, err => {
      if (err) {
         return console.log(err);
      }
      vscode.window.showWarningMessage('Created boilerplate file!');
   });
};

const getHTMLContentForPrompt = (baseHTML, filteredPrompt) => {
   const result = baseHTML.replace(/FILTERED_PROMPT/g, filteredPrompt);
   return result;
};

module.exports = {
   getFilteredPrompt,
   getStringifiedPrompt,
   generateTemplate,
   getHTMLContentForPrompt,
};
