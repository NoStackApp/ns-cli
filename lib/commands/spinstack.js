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
let Spinstack = /** @class */ (() => {
    class Spinstack extends command_1.Command {
        // static args = [{name: 'file'}]
        async run() {
            const { flags } = this.parse(Spinstack);
            const jsonPath = flags.jsonPath || isRequired_1.isRequired('json', 'spinstack', '-j');
            const stack = flags.stack || isRequired_1.isRequired('stack', 'spinstack', '-s');
            const user = flags.user || isRequired_1.isRequired('user', 'spinstack', '-u');
            const flowSpec = await getFlowSpec_1.getFlowSpec(flags.template) || '';
            if (!flowSpec)
                isRequired_1.isRequired('flowSpec', 'spinstack', '-t');
            const email = await getEmail_1.getEmail(flags.email);
            if (!email)
                isRequired_1.isRequired('email', 'quickstarter', '-e');
            const addedSuffix = flags.addedSuffix || '';
            let userInfo = newUserInfo_1.newUserInfo(user);
            userInfo.stack = stack;
            userInfo = await getUserInfo_1.getUserInfo(userInfo);
            const json = await buildStackFromTemplate_1.buildStackFromTemplate(flowSpec, userInfo, email, addedSuffix);
            if (json === undefined) {
                console.log('Try calling that request again.  Your user had to be logged in.');
                return;
            }
            await fs.outputJson(`${jsonPath}`, JSON.parse(json), (err) => {
                if (err) {
                    // @ts-ignore`
                    throw new Error(`Error writing the stack file ${jsonPath}: ${err}`);
                }
            });
            this.log(`The stack ${stack} has been generated.
    The file ${jsonPath} contains some information about it.`);
            // this.log(`json produced: ${JSON.stringify(JSON.parse(json), null, 2) }`)
        }
    }
    Spinstack.description = "Spins up a fully functional backend from a provided data flow spec.  The generated json can then be used to generate front end code using the command 'makeCode'.";
    Spinstack.examples = [
        '$ nostack spinstack -u franky -s tempstack -e franky@gmail.com -j ~/temp/stack.json -t appFlow.txt',
    ];
    Spinstack.flags = {
        help: command_1.flags.help({ char: 'h' }),
        jsonPath: command_1.flags.string({ char: 'j', description: 'path and filename for the stack json file.  The file tells you about your server and gets used to generate code for front end apps.' }),
        stack: command_1.flags.string({ char: 's', description: 'stack' }),
        template: command_1.flags.string({ char: 't', description: 'template from which to spin up a stack' }),
        // flag with a value (-n, --name=VALUE)
        user: command_1.flags.string({ char: 'u', description: 'moderator for stack' }),
        email: command_1.flags.string({ char: 'e', description: 'email to be used by sample users' }),
        addedSuffix: command_1.flags.string({ char: 'x', description: 'added suffix for sample instances generated' }),
    };
    return Spinstack;
})();
exports.default = Spinstack;
