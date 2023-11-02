const vscode = require('vscode');
const {
   getStagedFilesDiff,
   getHTMLContentForPrompt,
   getStringifiedPrompt,
   executeCommand,
   triggerUserInput,
   getValueFromEnv,
} = require('../helper/helpers');
const Prompts = require('../prompts/Prompts');
const { baseHTML } = require('../constants');
const TextBisonApiService = require('../service/TextBisonApiService');
const ChatCompletionsApiService = require('../service/ChatCompletionApiService');

const { TextBisonApi } = TextBisonApiService();
const { ChatCompletionApi } = ChatCompletionsApiService();

const splitCommit = commitMessage => {
   const commitMessageArray = commitMessage.split('#');
   const commitTitle = commitMessageArray[0];
   const commitDescription =
      commitMessageArray.length > 1
         ? commitMessageArray.slice(1).filter(item => item !== '')
         : [];
   return {
      commitTitle,
      commitDescription,
   };
};
const addPrefix = (commitMessage, issueNumber, pairName) => {
   let issueNumberPrefix = issueNumber !== '' ? `${issueNumber}: ` : '';
   let pairNamePrefix = pairName !== '' ? `${pairName}: ` : '';
   const mergedCommitMessage = `${issueNumberPrefix}${pairNamePrefix}${commitMessage}`;

   return mergedCommitMessage;
};

const makeCommit = async commitMessage => {
   const { commitTitle, commitDescription } = splitCommit(commitMessage);

   let commitCommand = `git commit -m "${commitTitle}"`;

   if (commitDescription.length > 0) {
      commitDescription.forEach(description => {
         commitCommand += ` -m "${description}"`;
      });
   }

   await executeCommand(commitCommand)
      .then(() => {
         vscode.window.showInformationMessage('Commit Successful ✅');
      })
      .catch(error => {
         console.error(`Error: ${error}`);
         vscode.window.showErrorMessage(
            'Error in committing changes, terminating...',
         );
      });
};

const getCommitMessagePrompt = diff => {
   let filteredPrompt = Prompts.SMART_COMMIT_MESSAGE.replace(
      '##GIT_DIFF##',
      diff,
   );
   return filteredPrompt;
};

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

      const selectedApiType = getValueFromEnv('API_TYPE');
      if (selectedApiType === undefined) {
         return vscode.window.showErrorMessage('Please set an API_TYPE');
      }
      const selectedApi =
         selectedApiType === 'GPT' ? ChatCompletionApi : TextBisonApi;

      const commitMessagePrompt = getCommitMessagePrompt(result);
      const panel = vscode.window.createWebviewPanel(
         'commitMessagePrompt',
         'Commit Message Prompt',
         vscode.ViewColumn.One,
         {},
      );
      panel.webview.html = getHTMLContentForPrompt(
         baseHTML,
         commitMessagePrompt,
      );
      let inputPrompt = getStringifiedPrompt(commitMessagePrompt);
      const issueNumber = await triggerUserInput(
         'Issue Number / Story ID',
         true,
      );
      const pairName = await triggerUserInput('Pair Name', true);

      const commitMessage = await selectedApi(inputPrompt);

      if (commitMessage) {
         const filteredCommitMessage = commitMessage.replace(/`/g, '');

         const mergeCommitMessage = addPrefix(
            filteredCommitMessage,
            issueNumber,
            pairName,
         );

         const finalCommitMessage = await vscode.window.showInputBox({
            value: mergeCommitMessage,
            validateInput: text => {
               if (text.trim() === '') {
                  return 'Commit message cannot be empty';
               }
               if (text == undefined) {
                  vscode.window.showErrorMessage(
                     'Input sequence cancelled, terminating...',
                  );
                  return undefined;
               }
               return null;
            },
         });

         if (finalCommitMessage !== undefined) {
            makeCommit(finalCommitMessage);
         }
      }
   });

module.exports = smartCommitAction;
