const vscode = require('vscode');

class CustomButtonTreeItem extends vscode.TreeItem {
   constructor(command) {
      super(command.title, vscode.TreeItemCollapsibleState.None);
      this.command = command;
   }
}
class TreeViewProvider {
   constructor(context) {
      this._onDidChangeTreeData = new vscode.EventEmitter();
      this.onDidChangeTreeData = this._onDidChangeTreeData.event;
      this.context = context;
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
               command: 'CodeXpert.setupWorkspace',
               title: 'Setup Workspace',
            }),
            new CustomButtonTreeItem({
               command: 'CodeXpert.createDockerFile',
               title: 'Create Docker File',
            }),
            new CustomButtonTreeItem({
               command: 'CodeXpert.smartCommit',
               title: 'Smart Commit',
            }),
         ]);
      }
   }

   refresh() {
      this._onDidChangeTreeData.fire(undefined);
   }
}

module.exports = TreeViewProvider;
