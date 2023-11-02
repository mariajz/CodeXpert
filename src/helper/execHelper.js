const util = require('util');
const exec = util.promisify(require('child_process').exec);

const executeTerminalCommand = async (command) => {
    try {
        const { stdout, stderr } = await exec(command);
        if (stderr) {
            console.error(`Error executing command: ${stderr}`);
            return '';
        }
        return stdout;
    } catch (error) {
        console.error(`Error executing command: ${error}`);
        return '';
    }
};

exports.executeTerminalCommand = executeTerminalCommand;