const vscode = require('vscode');
const { generateTemplate, setValueToEnv } = require('../helper/helpers');

const items = [
   {
      label: 'PaLM Api',
      description: 'Google',
      value: 'PALM',
   },
   {
      label: 'GPT completions Api',
      description: 'OpenAI',
      value: 'GPT',
   },
];

const toggleApiTypeAction = () =>
   vscode.commands.registerCommand(
      'CodeXpert.toggleApiType',
      async function () {
         generateTemplate('', '.env');

         const selectedApi = await vscode.window.showQuickPick(items);
         if (selectedApi != undefined) {
            setValueToEnv('API_TYPE', selectedApi.value);
         }
      },
   );

module.exports = toggleApiTypeAction;
