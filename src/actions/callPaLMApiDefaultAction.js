const vscode = require('vscode');
const TextBisonApiService = require('../service/TextBisonApiService');

const callPaLMApiDefaultAction = () => {
   const { TextBisonApi } = TextBisonApiService();

   vscode.commands.registerCommand('CodeXpert.callPaLMApi', async function () {
      if (!vscode.workspace || !vscode.workspace.workspaceFolders) {
         return vscode.window.showErrorMessage(
            'Please open a project folder first',
         );
      }
      TextBisonApi();
   });
};
module.exports = callPaLMApiDefaultAction;
