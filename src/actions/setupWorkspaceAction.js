const vscode = require('vscode');
const { generateTemplate } = require('../helper/helpers');

const setupWorkspaceAction = () =>
   vscode.commands.registerCommand(
      'CodeXpert.setupWorkspace',
      async function () {
         generateTemplate('', '.env');
      },
   );

module.exports = setupWorkspaceAction;
