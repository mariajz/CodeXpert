const vscode = require('vscode');

const scanDocumentForSecrets = document => {
   // if (
   //    document.languageId === 'plaintext' ||
   //    document.languageId === 'javascript'
   // ) {
   const text = document.getText();
   vscode.window.showInformationMessage(
      `Scanning ${document.fileName} for secrets...`,
   );
   console.log(text);
   // add talisman logic
};

module.exports = scanDocumentForSecrets;
