"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
// import {createModerator} from '../stacks/createModerator'
const quickStartForModerator_1 = require("../stacks/quickStartForModerator");
const isRequired_1 = require("../tools/isRequired");
class Quickstarter extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(Quickstarter);
        const stack = flags.stack || isRequired_1.isRequired('stack');
        const user = flags.user || isRequired_1.isRequired('user');
        const password = flags.password || isRequired_1.isRequired('password');
        const email = flags.email || isRequired_1.isRequired('email');
        const licenseId = flags.licenseId || isRequired_1.isRequired('licenseId');
        let userInfo = {
            name: user,
            stack,
            password,
            email,
            licenseId,
            stackId: '',
            refreshToken: '',
            accessToken: '',
            id: '',
        };
        console.log(`userInfo:${JSON.stringify(userInfo)}`);
        await quickStartForModerator_1.quickStartForModerator(userInfo);
        if (args.file && flags.force) {
            this.log(`you input --force and --file: ${args.file}`);
        }
    }
}
exports.default = Quickstarter;
Quickstarter.description = 'Creates a new moderator and stack.  Also logs in the moderator locally.';
Quickstarter.examples = [
    '$ nostack quickstarter -u franky -s tempstack, -e franky@gmail.com -w franky12$',
];
Quickstarter.flags = {
    help: command_1.flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    stack: command_1.flags.string({ char: 's', description: 'stack' }),
    licenseId: command_1.flags.string({ char: 'l', description: 'license id for the organization of the user' }),
    user: command_1.flags.string({ char: 'u', description: 'moderator to create' }),
    email: command_1.flags.string({ char: 'e', description: 'moderator email' }),
    password: command_1.flags.string({ char: 'w', description: 'moderator password' }),
    // flag with no value (-f, --force)
    force: command_1.flags.boolean({ char: 'f' }),
};
Quickstarter.args = [{ name: 'file' }];
