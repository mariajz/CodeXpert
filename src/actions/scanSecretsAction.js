const vscode = require('vscode');
const scanDocumentForSecrets = require('../service/ScanDocumentForSecretsService');

const scanSecretsAction = context => {
   if (!vscode.workspace || !vscode.workspace.workspaceFolders) {
      return vscode.window.showErrorMessage(
         'Please open a project folder first',
      );
   }

   // Event: When a new file is opened in the editor
   vscode.window.onDidChangeActiveTextEditor(editor => {
      if (editor) {
         const document = editor.document;
         scanDocumentForSecrets(document);
      }
   });

   // Event: When content is modified in an open file
   vscode.workspace.onDidChangeTextDocument(event => {
      const document = event.document;
      scanDocumentForSecrets(document);
   });

   // Optionally: Scan all currently open editors when extension activates
   vscode.window.visibleTextEditors.forEach(editor => {
      scanDocumentForSecrets(editor.document);
   });
};
module.exports = scanSecretsAction;
