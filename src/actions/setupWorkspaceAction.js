const fs = require('fs');
const vscode = require('vscode');
const {
   generateTemplate,
   triggerUserInput,
   setValueToEnv,
   copy_prompts
} = require('../helper/helpers');

const setupWorkspaceAction = () =>
   vscode.commands.registerCommand(
      'CodeXpert.setupWorkspace',
      async function () {
         generateTemplate('', '.env');
         const value = await triggerUserInput('PALM_API_KEY');
         if (value != undefined) {
            setValueToEnv('PALM_API_KEY', value);
            copy_prompts('prompt_for_json_conversion.txt');
            copy_prompts('prompt_for_json.txt');
         }
      },
   );





module.exports = setupWorkspaceAction;
