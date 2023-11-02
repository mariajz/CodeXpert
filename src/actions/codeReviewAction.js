const vscode = require('vscode');
const {
   getStagedFilesFullDiff,
   getHTMLContentForPrompt,
   getStringifiedPrompt,
   getValueFromEnv,
} = require('../helper/helpers');
const Prompts = require('../prompts/Prompts');
const { baseHTML } = require('../constants');
const TextBisonApiService = require('../service/TextBisonApiService');
const ChatCompletionsApiService = require('../service/ChatCompletionApiService');

const getCodeReviewPrompt = diff => {
   let filteredPrompt = Prompts.CODE_REVIEW.replace('##GIT_FULL_DIFF##', diff);
   return filteredPrompt;
};
const { TextBisonApi } = TextBisonApiService();
const { ChatCompletionApi } = ChatCompletionsApiService();

const codeReviewAction = () =>
   vscode.commands.registerCommand('CodeXpert.codeReview', async function () {
      const result = await getStagedFilesFullDiff();
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

      const codeReviewPrompt = getCodeReviewPrompt(result);
      const promptPanel = vscode.window.createWebviewPanel(
         'codeReviewPrompt',
         'Sample Prompt for Code Review',
         vscode.ViewColumn.One,
         {},
      );
      promptPanel.webview.html = getHTMLContentForPrompt(
         baseHTML,
         codeReviewPrompt,
      );

      let inputPrompt = getStringifiedPrompt(codeReviewPrompt);

      const reviews = await selectedApi(inputPrompt);

      if (reviews) {
         const reviewedCodePanel = vscode.window.createWebviewPanel(
            'codeReviewResults',
            'Code Review Results',
            vscode.ViewColumn.One,
            {},
         );
         reviewedCodePanel.webview.html = getHTMLContentForPrompt(
            baseHTML,
            reviews,
         );
      }
   });

module.exports = codeReviewAction;
