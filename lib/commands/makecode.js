"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorEx = require('error-ex');
const fs = require('fs-extra');
const command_1 = require("@oclif/command");
const generateAppCode_1 = require("../codeGeneration/generateAppCode");
const isRequired_1 = require("../tools/isRequired");
exports.noNameError = errorEx('noNameError');
class Makecode extends command_1.Command {
    async run() {
        // const {args, flags} = this.parse(Makecode)
        const { flags } = this.parse(Makecode);
        // const template = flags.template || ''
        const appName = flags.appName || isRequired_1.isRequired('appName', 'makecode', 'a');
        let userClass = flags.userClass;
        if (!userClass) {
            const stack = await fs.readJSON(`${appName}/stack.json`);
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
        // this.log(`userClass is ${userClass}`)
        // await generateCodeFiles(appName)  // temp, to debug
        // try {
        // await generateCodeFiles(appName)
        // await generateCodeFiles(appName, userClass)
        // } catch (err) {
        //   console.log(`error when attempting to generate the code: ${err}`)
        //   throw new Error(`code generation error: ${err}`)
        // }
        const generateAppTasks = await generateAppCode_1.generateAppCode(appName, userClass);
        await generateAppTasks.run().catch((err) => {
            console.error(err);
        });
    }
}
exports.default = Makecode;
Makecode.description = 'generates a starter app from a json provided by NoStack';
Makecode.flags = {
    // template: flags.string({char: 't', description: 'template file'}),
    userClass: command_1.flags.string({ char: 'c', description: 'user class for which to generate an app' }),
    appName: command_1.flags.string({ char: 'a', description: 'application name' }),
    help: command_1.flags.help({ char: 'h' }),
};
Makecode.args = [];
