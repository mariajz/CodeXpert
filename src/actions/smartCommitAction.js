const vscode = require('vscode');
const {
   getStagedFilesDiff,
   getHTMLContentForPrompt,
   getStringifiedPrompt,
} = require('../helper/helpers');
const Prompts = require('../prompts/Prompts');
const { baseHTML } = require('../constants');
const TextBisonApiService = require('../service/TextBisonApiService');

const getCommitMessagePrompt = diff => {
   let filteredPrompt = Prompts.SMART_COMMIT_MESSAGE.replace(
      '##GIT_DIFF##',
      diff,
   );
   return filteredPrompt;
};
const { TextBisonApi } = TextBisonApiService();

const smartCommitAction = () =>
   vscode.commands.registerCommand('CodeXpert.smartCommit', async function () {
      const result = await getStagedFilesDiff();
      if (result === undefined) {
         vscode.window.showErrorMessage(
            'Error in getting staged files diff, terminating...',
         );
         return;
      } else if (result === '') {
         vscode.window.showInformationMessage(
            'No staged files found, terminating...',
         );
         return;
      } else {
         vscode.window.showInformationMessage(
            'Staged files diff fetched successfully',
         );
      }

      const commitMessagePrompt = getCommitMessagePrompt(result);
      const panel = vscode.window.createWebviewPanel(
         'samplePrompt',
         'Sample Prompt for Commit Message',
         vscode.ViewColumn.One,
         {},
      );
      panel.webview.html = getHTMLContentForPrompt(
         baseHTML,
         commitMessagePrompt,
      );

      let inputPrompt = getStringifiedPrompt(commitMessagePrompt);

      TextBisonApi(inputPrompt);
   });

module.exports = smartCommitAction;
