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
// import {buildStackFromTemplate} from '../stacks/buildStackFromTemplate'
const modifyStackFromSpec_1 = require("../stacks/modifyStackFromSpec");
const fs = require('fs-extra'); // @ts-ignore
let Dataspec = /** @class */ (() => {
    class Dataspec extends command_1.Command {
        // static args = [{name: 'file'}]
        async run() {
            const { flags } = this.parse(Dataspec);
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
            const resetLevel = flags.resetLevel || 'SAVE_EVERYTHING';
            let userInfo = newUserInfo_1.newUserInfo(user);
            userInfo.stack = stack;
            userInfo = await getUserInfo_1.getUserInfo(userInfo);
            const json = await modifyStackFromSpec_1.modifyStackFromSpec(flowSpec, userInfo, email, addedSuffix, resetLevel);
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
            this.log(`The stack ${stack} has been modified.
    The file ${jsonPath} contains some information about it.`);
            // this.log(`json produced: ${JSON.stringify(JSON.parse(json), null, 2) }`)
        }
    }
    Dataspec.description = "Spins up a fully functional backend from a provided data spec in yaml format. The stored json can then be used to generate front end code using the command 'makeCode'.";
    Dataspec.examples = [
        '$ nostack dataspec -u franky -s tempstack, -e franky@gmail.com -j ~/temp/stack.json -t appFlow.yaml -r SAVE_EVERYTHING',
    ];
    Dataspec.flags = {
        help: command_1.flags.help({ char: 'h' }),
        jsonPath: command_1.flags.string({ char: 'j', description: 'path and filename for the stack json file.  The file tells you about your server and gets used to generate code for front end apps.' }),
        stack: command_1.flags.string({ char: 's', description: 'stack' }),
        template: command_1.flags.string({ char: 't', description: 'data spec to create or modify a stack' }),
        // flag with a value (-n, --name=VALUE)
        user: command_1.flags.string({ char: 'u', description: 'moderator for stack' }),
        email: command_1.flags.string({ char: 'e', description: 'email to be used by sample users' }),
        addedSuffix: command_1.flags.string({ char: 'x', description: 'added suffix for sample instances generated' }),
        resetLevel: command_1.flags.string({ char: 'r', description: 'resetLevel for the stack being used.  Can currently be: "SAVE_EVERYTHING" or "ALL_BUT_MODERATOR".  By default, SAVE_EVERYTHING.' }),
    };
    return Dataspec;
})();
exports.default = Dataspec;
