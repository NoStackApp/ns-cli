"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const getEmail_1 = require("../inputs/getEmail");
const getLicenseId_1 = require("../inputs/getLicenseId");
const getModeratorName_1 = require("../inputs/getModeratorName");
const getPassword_1 = require("../inputs/getPassword");
const getStackName_1 = require("../inputs/getStackName");
const isRequired_1 = require("../inputs/isRequired");
// import {createModerator} from '../stacks/createModerator'
const create_stack_and_moderator_1 = require("../stacks/create-stack-and-moderator");
class Createstack extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(Createstack);
        const stack = await getStackName_1.getStackName(flags.stack);
        if (!stack)
            isRequired_1.isRequired('stack', 'createstack', '-s');
        const user = await getModeratorName_1.getModeratorName(flags.user);
        if (!user)
            isRequired_1.isRequired('user', 'createstack', '-u');
        const password = await getPassword_1.getPassword(flags.password);
        if (!password)
            isRequired_1.isRequired('password', 'createstack', '-w');
        const email = await getEmail_1.getEmail(flags.email);
        if (!email)
            isRequired_1.isRequired('email', 'createstack', '-e');
        const licenseId = await getLicenseId_1.getLicenseId(flags.licenseId);
        if (!licenseId)
            isRequired_1.isRequired('licenseId', 'createstack', '-l');
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
        // console.log(`userInfo:${JSON.stringify(userInfo)}`)
        // await createStackAndModerator(userInfo)
        const newStackTasks = await create_stack_and_moderator_1.createStackAndModerator(userInfo);
        await newStackTasks.run().catch((err) => {
            console.error(err);
        });
        if (args.file && flags.force) {
            this.log(`you input --force and --file: ${args.file}`);
        }
    }
}
exports.default = Createstack;
Createstack.description = 'Creates a new moderator and stack.  Also logs in the moderator locally.';
Createstack.examples = [
    '$ nostack createStack -u franky -s tempstack, -e franky@gmail.com -w franky12$',
];
Createstack.flags = {
    help: command_1.flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    // appName: flags.string({char: 'a', description: 'name of application'}),
    stack: command_1.flags.string({ char: 's', description: 'stack' }),
    licenseId: command_1.flags.string({ char: 'l', description: 'license id for the organization of the user' }),
    user: command_1.flags.string({ char: 'u', description: 'moderator to create' }),
    email: command_1.flags.string({ char: 'e', description: 'moderator email' }),
    password: command_1.flags.string({ char: 'w', description: 'moderator password' }),
    // flag with no value (-f, --force)
    force: command_1.flags.boolean({ char: 'f' }),
};
Createstack.args = [];
