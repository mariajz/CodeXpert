const vscode = require('vscode');
const TreeViewProvider = require('./helper/TreeViewProvider');
const createDockerFileAction = require('./actions/createDockerFileAction');
const setupWorkspaceAction = require('./actions/setupWorkspaceAction');
const smartCommitAction = require('./actions/smartCommitAction');
const codeReviewAction = require('./actions/codeReviewAction');
const explainCodeAction = require('./actions/explainCodeAction');
const explainCurrentCodeAction = require('./actions/explainCurrentCodeAction');
const toggleApiTypeAction = require('./actions/toggleApiTypeAction');
const dockerHelpAction = require('./actions/dockerHelpAction');
const updateDockerfileAction = require('./actions/updateDockerFileAction');

const activate = async context => {
   toggleApiTypeAction();
   setupWorkspaceAction();
   createDockerFileAction();
   dockerHelpAction();
   updateDockerfileAction();
   smartCommitAction();
   codeReviewAction();
   explainCodeAction();
   explainCurrentCodeAction();

   let treeViewProvider = new TreeViewProvider(context);
   vscode.window.registerTreeDataProvider('codexpert', treeViewProvider);

   context.subscriptions.push(createDockerFileAction);
};
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
