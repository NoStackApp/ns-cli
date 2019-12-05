"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorEx = require('error-ex');
const fs = require('fs-extra');
const command_1 = require("@oclif/command");
const generateAppCode_1 = require("../codeGeneration/generateAppCode");
// import {getAppName} from '../inputs/getAppName'
const isRequired_1 = require("../inputs/isRequired");
exports.noNameError = errorEx('noNameError');
class Makecode extends command_1.Command {
    async run() {
        // const {args, flags} = this.parse(Makecode)
        const { flags } = this.parse(Makecode);
        const appDir = flags.appDir || isRequired_1.isRequired('appDir', 'makecode', 'a');
        const jsonPath = flags.jsonPath || isRequired_1.isRequired('jsonPath', 'makecode', '-j');
        let userClass = flags.userClass;
        if (!userClass) {
            const stack = await fs.readJSON(jsonPath);
            const userClasses = stack.userClasses;
            const userClassNames = Object.keys(userClasses);
            if (userClassNames.length !== 1) {
                this.log(`error calling makecode: you did not specify a user class with '--userClass' or '-c'.
        Your options for user classes in the stack of this app are:\n\t\t${userClassNames.join('\n\t\t')}`);
                process.exit(1);
            }
            userClass = userClassNames[0];
            // this.log(`userClass has been set to ${userClass}`)
        }
        const generateAppTasks = await generateAppCode_1.generateAppCode(appDir, userClass, jsonPath);
        await generateAppTasks.run().catch((err) => {
            console.error(err);
        });
    }
}
exports.default = Makecode;
Makecode.description = 'generates a starter app from a json provided by NoStack';
Makecode.examples = [
    '$ nostack makecode -a ~/temp/myapp -j ~/temp/stack.json -c buyer',
];
Makecode.flags = {
    // template: flags.string({char: 't', description: 'template file'}),
    userClass: command_1.flags.string({ char: 'c', description: 'user class for which to generate an app' }),
    appDir: command_1.flags.string({ char: 'a', description: 'application directory' }),
    jsonPath: command_1.flags.string({ char: 'j', description: 'path and filename for the stack json file.  The file tells you about your server and gets used to generate code for front end apps.' }),
    help: command_1.flags.help({ char: 'h' }),
};
Makecode.args = [];
