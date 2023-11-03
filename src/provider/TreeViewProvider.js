const vscode = require('vscode');

class CustomButtonTreeItem extends vscode.TreeItem {
   constructor(command) {
      super(command.title, vscode.TreeItemCollapsibleState.None);
      this.command = command;
      this.tooltip = command.tooltip;
      this.iconPath = new vscode.ThemeIcon('symbol-method');
   }
}
class TreeViewProvider {
   constructor(context) {
      this._onDidChangeTreeData = new vscode.EventEmitter();
      this.onDidChangeTreeData = this._onDidChangeTreeData.event;
      this.context = context;
   }

   getTooltip() {
      return this.command.tooltip;
   }

   getTreeItem(element) {
      return element;
   }

   getChildren(element) {
      if (element) {
         return Promise.resolve([]);
      } else {
         return Promise.resolve([
            new CustomButtonTreeItem({
               command: 'CodeXpert.toggleApiType',
               title: 'Toggle Api Type',
               tooltip:
                  'Allows you to toggle between PaLM Api (Free) and Open AI Code Completions Api (Paid)',
            }),
            new CustomButtonTreeItem({
               command: 'CodeXpert.setupWorkspace',
               title: 'Setup Workspace',
               tooltip: 'Setup the keys required for the extension to work',
            }),
            new CustomButtonTreeItem({
               command: 'CodeXpert.createDockerFile',
               title: 'Create Docker File',
               tooltip: 'Create a .dockerfile with minimal inputs',
            }),
            new CustomButtonTreeItem({
               command: 'CodeXpert.dockerHelp',
               title: 'Docker Help',
               tooltip: 'Get help with docker commands',
            }),
            new CustomButtonTreeItem({
               command: 'CodeXpert.updateDockerfile',
               title: 'Update Dockerfile (beta)',
               tooltip: 'Get suggestions for your existing dockerfile',
            }),
            new CustomButtonTreeItem({
               command: 'CodeXpert.smartCommit',
               title: 'Smart Commit',
               tooltip: 'Create a commit message from the staged files',
            }),
            new CustomButtonTreeItem({
               command: 'CodeXpert.codeReview',
               title: 'Code Review',
               tooltip: 'Get your staged code reviewed by AI',
            }),
            new CustomButtonTreeItem({
               command: 'CodeXpert.explainCode',
               title: 'Explain Project',
               tooltip: 'Get an AI delivered explantion for any intricate code',
            }),
            new CustomButtonTreeItem({
               command: 'CodeXpert.explainCurrentCode',
               title: 'Explain Current Code',
            }),
         ]);
      }
   }

   refresh() {
      this._onDidChangeTreeData.fire(undefined);
   }
}

module.exports = TreeViewProvider;
