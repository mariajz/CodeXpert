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

const explainCurrentCodeAction = () =>
   vscode.commands.registerCommand(
      'CodeXpert.explainCurrentCode',
      async function () {
         const explainCodePrompt = getExplainCodePrompt();
         const promptPanel = vscode.window.createWebviewPanel(
            'explainCurrentCodePrompt',
            'Sample Prompt for Explaining Current Code',
            vscode.ViewColumn.One,
            {},
         );
         promptPanel.webview.html = getHTMLContentForPrompt(
            baseHTML,
            explainCodePrompt,
         );
         let argument = vscode.window.activeTextEditor.document.uri.fsPath;
         runPythonScripts(
            vscode.workspace.rootPath,
            'explain_given_file.py',
            argument,
         );
      },
   );

module.exports = explainCurrentCodeAction;
