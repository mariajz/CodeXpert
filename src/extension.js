require('dotenv').config();
const vscode = require('vscode');
const TreeViewProvider = require('./helper/TreeViewProvider');
const generateTemplateAction = require('./actions/generateTemplateAction');
const callPaLMApiDefaultAction = require('./actions/callPaLMApiDefaultAction');
const createDockerFileAction = require('./actions/createDockerFileAction');

const activate = async context => {
   generateTemplateAction();
   callPaLMApiDefaultAction();
   createDockerFileAction();

   let treeViewProvider = new TreeViewProvider(context);
   vscode.window.registerTreeDataProvider('codexpert', treeViewProvider);

   context.subscriptions.push(generateTemplateAction);
   context.subscriptions.push(callPaLMApiDefaultAction);
   context.subscriptions.push(createDockerFileAction);
};
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
