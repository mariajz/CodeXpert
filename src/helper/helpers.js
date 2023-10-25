const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const { regexMap, validValues } = require('../constants/constants');

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

   folderPath = folderPath + '/';

   const filePath = path.join(folderPath, filename);

   fs.access(filePath, fs.constants.F_OK, err => {
      if (!err) {
         return vscode.window.showWarningMessage('File already exists!');
      }

      fs.writeFile(filePath, content, err => {
         if (err) {
            return console.log(err);
         }
         vscode.window.showWarningMessage('Created boilerplate file!');
      });
   });
};

const getHTMLContentForPrompt = (baseHTML, filteredPrompt) => {
   const result = baseHTML.replace(/FILTERED_PROMPT/g, filteredPrompt);
   return result;
};

const properties = Object.keys(validValues);
const getUserInput = async index => {
   if (index >= properties.length) {
      return validValues;
   }

   const propertyName = properties[index];

   const text = await vscode.window.showInputBox({
      placeHolder: propertyName,
      validateInput: text => {
         const regex = regexMap[propertyName];
         const isValid = regex.test(text);
         if (isValid) {
            validValues[propertyName] = text;
         }
         return isValid ? null : 'Invalid input';
      },
   });

   if (text !== undefined) {
      await getUserInput(index + 1);
   } else {
      vscode.window.showErrorMessage(
         'Input sequence cancelled, terminating...',
      );
      return undefined;
   }
   return validValues;
};

const triggerUserInput = async inputType => {
   const text = await vscode.window.showInputBox({
      placeHolder: inputType,
   });
   if (text !== undefined) {
      vscode.window.showInformationMessage('Setting the value...');
      return text;
   } else {
      vscode.window.showErrorMessage(
         'Input sequence cancelled, terminating...',
      );
      return undefined;
   }
};

const setValueToEnv = (key, value) => {
   if (!vscode.workspace || !vscode.workspace.workspaceFolders) {
      return vscode.window.showErrorMessage(
         'Please open a project folder first',
      );
   }
   let folderPath = vscode.workspace.workspaceFolders[0].uri
      .toString()
      .split(':')[1];

   folderPath = folderPath + '/.env';

   fs.readFile(folderPath, 'utf8', (err, data) => {
      if (err) {
         return console.log(err);
      }
      const keyExists = data.match(new RegExp(`${key}=.+`));

      if (keyExists) {
         const updatedData = data.replace(
            new RegExp(`${key}=.+`),
            `${key}="${value}"`,
         );
         fs.writeFile(folderPath, updatedData, 'utf8', err => {
            if (err) {
               console.error(err);
               return;
            }
            console.log(`${key} updated to ${value}`);
         });
      } else {
         fs.appendFile(folderPath, `\n${key}="${value}"`, 'utf8', err => {
            if (err) {
               console.error(err);
               return;
            }
            console.log(`${key} added with value ${value}`);
         });
      }
   });
};

module.exports = {
   getFilteredPrompt,
   getStringifiedPrompt,
   generateTemplate,
   getHTMLContentForPrompt,
   getUserInput,
   triggerUserInput,
   setValueToEnv,
};
