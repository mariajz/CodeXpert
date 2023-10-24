const vscode = require('vscode');
const { generateTemplate } = require('../helper/helpers');
const { htmlContent } = require('../constants');

const generateTemplateAction = () =>
   vscode.commands.registerCommand(
      'CodeXpert.generateTemplate',
      async function () {
         generateTemplate(htmlContent, 'index.html');
      },
   );

module.exports = generateTemplateAction;
