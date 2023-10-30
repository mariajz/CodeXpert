const vscode = require('vscode');
const {
   getHTMLContentForPrompt,
   runPythonScripts,
} = require('../helper/helpers');
const Prompts = require('../prompts/Prompts');
const { baseHTML } = require('../constants');

const getExplainCodePrompt = () => {
   return Prompts.EXPLAIN_CODE;
};

const explainCodeAction = () =>
   vscode.commands.registerCommand('CodeXpert.explainCode', async function () {
      const explainCodePrompt = getExplainCodePrompt();
      const promptPanel = vscode.window.createWebviewPanel(
         'samplePrompt',
         'Sample Prompt for Explaining Code',
         vscode.ViewColumn.One,
         {},
      );
      promptPanel.webview.html = getHTMLContentForPrompt(
         baseHTML,
         explainCodePrompt,
      );

      // uncomment this to test python scripts
      // runPythonScripts();
   });

module.exports = explainCodeAction;
