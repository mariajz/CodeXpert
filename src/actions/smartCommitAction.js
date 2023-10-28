const vscode = require('vscode');

const smartCommitAction = () =>
   vscode.commands.registerCommand(
      'CodeXpert.smartCommit',
      async function () {},
   );

module.exports = smartCommitAction;
