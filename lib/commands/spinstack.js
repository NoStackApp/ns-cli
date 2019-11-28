"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const getUserInfo_1 = require("../auth/getUserInfo");
const newUserInfo_1 = require("../auth/newUserInfo");
// import {getAppName} from '../inputs/getAppName'
const getEmail_1 = require("../inputs/getEmail");
const getFlowSpec_1 = require("../inputs/getFlowSpec");
// import {getNewModeratorName} from '../inputs/getNewModeratorName'
// import {getNewStackName} from '../inputs/getNewStackName'
const isRequired_1 = require("../inputs/isRequired");
const buildStackFromTemplate_1 = require("../stacks/buildStackFromTemplate");
const fs = require('fs-extra'); // @ts-ignore
class Spinstack extends command_1.Command {
    // static args = [{name: 'file'}]
    async run() {
        const { flags } = this.parse(Spinstack);
        const appName = flags.appName || isRequired_1.isRequired('appName', 'spinstack', '-a');
        const stack = flags.stack || isRequired_1.isRequired('stack', 'spinstack', '-s');
        const user = flags.user || isRequired_1.isRequired('user', 'spinstack', '-u');
        // const stack = await getNewStackName(flags.stack)
        // if (!stack) isRequired('stack', 'spinstack', '-s')
        //
        // const user = await getNewModeratorName(flags.user)
        // if (!user) isRequired('user', 'spinstack', '-u')
        //
        // const appName = await getAppName(flags.appName) || ''
        // if (!appName) isRequired('appName', 'spinstack', '-a')
        const flowSpec = await getFlowSpec_1.getFlowSpec(flags.template) || '';
        if (!flowSpec)
            isRequired_1.isRequired('flowSpec', 'spinstack', '-t');
        const email = await getEmail_1.getEmail(flags.email);
        if (!email)
            isRequired_1.isRequired('email', 'quickstarter', '-e');
        const addedSuffix = flags.addedSuffix || '';
        let userInfo = newUserInfo_1.newUserInfo(user);
        userInfo.stack = stack;
        // console.log(`in spinstack, userInfo:${JSON.stringify(userInfo)}`)
        userInfo = await getUserInfo_1.getUserInfo(userInfo);
        // console.log(`in spinstack after getUserInfo, userInfo:${JSON.stringify(userInfo)}`)
        const json = await buildStackFromTemplate_1.buildStackFromTemplate(flowSpec, userInfo, email, addedSuffix);
        // console.log(`JSON TO OUTPUT... ${JSON.stringify(json)}`)
        if (json === undefined) {
            console.log('Try calling that request again.  Your user had to be logged in.');
            return;
        }
        await fs.outputJson(`${appName}/stack.json`, JSON.parse(json), (err) => {
            if (err) {
                // @ts-ignore`
                throw new Error(`Error writing the stack file ${appName}/stack.json: ${err}`);
            }
        });
        this.log(`The stack ${stack} has been generated.
    The file ${appName}/stack.json contains some information about it.`);
        // this.log(`json produced: ${JSON.stringify(JSON.parse(json), null, 2) }`)
    }
}
exports.default = Spinstack;
Spinstack.description = "Spins up a fully functional backend from a provided template.  The same template can then be used to generate front end code using the command 'makeCode'.";
Spinstack.flags = {
    help: command_1.flags.help({ char: 'h' }),
    appName: command_1.flags.string({ char: 'a', description: 'application name' }),
    stack: command_1.flags.string({ char: 's', description: 'stack' }),
    template: command_1.flags.string({ char: 't', description: 'template from which to spin up a stack' }),
    // flag with a value (-n, --name=VALUE)
    user: command_1.flags.string({ char: 'u', description: 'moderator for stack' }),
    email: command_1.flags.string({ char: 'e', description: 'email to be used by sample users' }),
    addedSuffix: command_1.flags.string({ char: 'x', description: 'added suffix for sample instances generated' }),
};
