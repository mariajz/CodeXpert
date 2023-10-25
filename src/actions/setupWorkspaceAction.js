const vscode = require('vscode');
const {
   generateTemplate,
   triggerUserInput,
   setValueToEnv,
} = require('../helper/helpers');

const setupWorkspaceAction = () =>
   vscode.commands.registerCommand(
      'CodeXpert.setupWorkspace',
      async function () {
         generateTemplate('', '.env');
         const value = await triggerUserInput('PALM_API_KEY');
         if (value != undefined) {
            setValueToEnv('PALM_API_KEY', value);
         }
      },
   );

module.exports = setupWorkspaceAction;
