const vscode = require('vscode');

class TreeViewProvider {
   constructor(context) {
      this._onDidChangeTreeData = new vscode.EventEmitter();
      this.onDidChangeTreeData = this._onDidChangeTreeData.event;
      this.context = context;
   }

   getTreeItem(element) {
      return element;
   }

   getChildren() {
      return [new vscode.TreeItem('Child 1'), new vscode.TreeItem('Child 2')];
   }

   refresh() {
      this._onDidChangeTreeData.fire(undefined);
   }
}

module.exports = TreeViewProvider;
