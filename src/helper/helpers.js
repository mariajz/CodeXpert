const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const { regexMap, nonEmptyValues } = require('../constants/constants');
const dotenv = require('dotenv');
const Prompts = require('../prompts/Prompts');
const { exec } = require('child_process');
const { baseHTML, treeHTML } = require('../constants');

const getFilteredPrompt = (prompt, envVariableList) => {
   let filteredPrompt = prompt;

   for (const key in envVariableList) {
      const pattern = new RegExp(`##${key}##`, 'g');
      if (envVariableList[key] === '') {
         filteredPrompt = filteredPrompt.replace(pattern, '');
      } else {
         if (Prompts.hasOwnProperty(key)) {
            filteredPrompt = filteredPrompt
               .replace(pattern, Prompts[key])
               .replace(pattern, envVariableList[key]);
         } else {
            filteredPrompt = filteredPrompt.replace(
               pattern,
               envVariableList[key],
            );
         }
      }
   }

   return filteredPrompt;
};

const extractEnvVariablesFromPrompt = prompt => {
   const pattern = /##(.*?)##/g;
   const matches = [...prompt.matchAll(pattern)].map(match => match[1]);
   const result = {};
   for (const match of matches) {
      result[match] = null;
   }
   return result;
};

const getStringifiedPrompt = prompt => {
   const stringifiedPrompt = JSON.stringify(prompt);

   return stringifiedPrompt;
};

const generateTemplate = (content, filename) => {
   let folderPath = getRootFolderPath();
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
   const escapedPrompt = filteredPrompt
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
   const result = baseHTML.replace(/FILTERED_PROMPT/g, escapedPrompt);
   return result;
};

const constructHTMLContent = (baseHTML, tagToBeIncluded, replacementKey) => {
   
   const result = baseHTML.replace(replacementKey, tagToBeIncluded);
   return result;
};

const validateUserInput = (key, text) => {
   if (regexMap.hasOwnProperty(key)) {
      const regex = regexMap[key];
      const isValid = regex.test(text);
      return isValid;
   } else {
      return true;
   }
};

const getUserInputs = async inputValues => {
   let result = inputValues;

   for (const key in inputValues) {
      const text = await vscode.window.showInputBox({
         placeHolder: key,
         validateInput: text => {
            if (text.trim() === '' && key in nonEmptyValues) {
               return 'Input cannot be empty';
            }
            const isValid = validateUserInput(key, text);
            if (!isValid) {
               return 'Invalid input';
            }
            result[key] = text;
            return null;
         },
      });
      if (text == undefined) {
         vscode.window.showErrorMessage(
            'Input sequence cancelled, terminating...',
         );
         return undefined;
      }
   }

   return result;
};

const triggerUserInput = async (inputType, isEmptyAllowed = false) => {
   const text = await vscode.window.showInputBox({
      placeHolder: inputType,
   });
   if (text !== undefined) {
      vscode.window.showInformationMessage('Setting the value...');
      return text;
   } else if (!isEmptyAllowed) {
      vscode.window.showErrorMessage(
         'Input sequence cancelled, terminating...',
      );
      return undefined;
   } else {
      return '';
   }
};

const setValueToEnv = (key, value) => {
   let folderPath = getRootFolderPath();

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

const readFileContent = async filePath => {
   const rootFolderPath = getRootFolderPath();
   const path = rootFolderPath + '/' + filePath;
   const result = fs.promises.readFile(path, 'utf8');
   return result;
};

const getValueFromEnv = key => {
   let folderPath = getRootFolderPath();

   folderPath = folderPath + '/.env';
   const result = dotenv.config({ path: folderPath });
   const value =
      result && result.parsed && result.parsed.hasOwnProperty(key)
         ? result.parsed[key]
         : undefined;
   return value;
};

const getStagedFiles = async () => {
   const gitExtension = vscode.extensions.getExtension('vscode.git');
   if (!gitExtension) {
      vscode.window.showErrorMessage(
         'Git extension not found. Please install a Git extension to use this feature.',
      );
   }

   const api = gitExtension.exports.getAPI(1);
   if (!api) {
      vscode.window.showErrorMessage('Unable to get Git API.');
   }

   const repository = api.repositories[0];
   if (!repository) {
      vscode.window.showErrorMessage('No Git repository found.');
   }

   const changes = await repository.diffIndexWithHEAD();

   return changes.filter(change => change.type === vscode.FileChangeType.Add);
};

const getRootFolderPath = () => {
   if (!vscode.workspace || !vscode.workspace.workspaceFolders) {
      return vscode.window.showErrorMessage(
         'Please open a project folder first',
      );
   }
   let rootFolderPath = vscode.workspace.rootPath;
   return rootFolderPath;
};

const executeCommand = async command => {
   const rootFolderPath = getRootFolderPath();

   return new Promise((resolve, reject) => {
      const fullCommand = `cd ${rootFolderPath} && ${command}`;

      exec(fullCommand, (error, stdout) => {
         if (error) {
            reject(error);
         }
         resolve(stdout);
      });
   });
};

const getStagedFilesDiff = async () => {
   const command = 'git diff --cached | grep -E ^[+-]';
   let result;
   await executeCommand(command)
      .then(stdout => {
         result = stdout;
      })
      .catch(error => {
         console.error(`Error: ${error}`);
      });

   return result;
};

const getStagedFilesFullDiff = async () => {
   const command = 'git diff --cached -U10000';
   let result;
   await executeCommand(command)
      .then(stdout => {
         result = stdout;
      })
      .catch(error => {
         console.error(`Error: ${error}`);
      });

   return result;
};

const runPythonScripts = async (workspace_path, script_name, argument, context) => {
   const pythonScriptPath =
      path.join(__dirname, '../scripts/' + script_name) + ' ' + workspace_path;
   await exec(
      `python3 ${pythonScriptPath} ${argument}`,
      (error, stdout, stderr) => {
         if (error) {
            console.error(`Error: ${error.message}`);
            return;
         }
         if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
         }
         console.log(`stdout: ${stdout}`);
         const promptPanel = vscode.window.createWebviewPanel(
            'Code Explanation',
            'Code Explanation',
            vscode.ViewColumn.One,
            {enableScripts: true, },
         );
         const scriptUri = promptPanel.webview.asWebviewUri( vscode.Uri.joinPath(context.extensionUri, 'media', 'treeViewer.js') ); 
         let html =  constructHTMLContent(treeHTML, stdout, 'FILE_TREE');
         html = constructHTMLContent(html, scriptUri, 'SCRIPT_URI');
         promptPanel.webview.html = html;
      },
   );

   console.log('Python script executed');
};

const copy_prompts = file_name => {
   let sourceFilePath = path.join(__dirname, '../scripts/' + file_name);
   let destinationFilePath = vscode.workspace.rootPath + '/' + file_name;
   fs.copyFile(sourceFilePath, destinationFilePath, error => {
      if (error) {
         console.error('Error occurred while copying the file:', error);
      } else {
         console.log('File was successfully copied.');
      }
   });
};

const writeToVSConfig = async (key, value) => {
   await vscode.workspace
      .getConfiguration('CodeXpert')
      .update(key, value, vscode.ConfigurationTarget.WorkspaceFolder);
   return;
};

const readFromVSConfig = async key => {
   const config = vscode.workspace.getConfiguration('CodeXpert');
   return config.get(key);
};

module.exports = {
   extractEnvVariablesFromPrompt,
   getFilteredPrompt,
   getStringifiedPrompt,
   generateTemplate,
   getHTMLContentForPrompt,
   getUserInputs,
   triggerUserInput,
   setValueToEnv,
   getValueFromEnv,
   getStagedFiles,
   getStagedFilesDiff,
   executeCommand,
   getRootFolderPath,
   getStagedFilesFullDiff,
   runPythonScripts,
   copy_prompts,
   writeToVSConfig,
   readFromVSConfig,
   readFileContent,
};
