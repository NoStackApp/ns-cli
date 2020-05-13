"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const getEmail_1 = require("../inputs/getEmail");
const getLicenseId_1 = require("../inputs/getLicenseId");
const getNewModeratorName_1 = require("../inputs/getNewModeratorName");
const getNewStackName_1 = require("../inputs/getNewStackName");
const getPassword_1 = require("../inputs/getPassword");
const isRequired_1 = require("../inputs/isRequired");
// import {createModerator} from '../stacks/createModerator'
const create_stack_and_moderator_1 = require("../stacks/create-stack-and-moderator");
let Createstack = /** @class */ (() => {
    class Createstack extends command_1.Command {
        async run() {
            const { flags } = this.parse(Createstack);
            const stack = await getNewStackName_1.getNewStackName(flags.stack);
            if (!stack)
                isRequired_1.isRequired('stack', 'createstack', '-s');
            const user = await getNewModeratorName_1.getNewModeratorName(flags.user);
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
                throw new Error(err);
            });
            console.log(`The stack ${stack} and its moderator ${user} have been created.
    You can now run commands with the parameters '-u ${user} -s ${stack}'.
    Try using 'nostack spinstack' with a script to generate a back end.`);
        }
    }
    Createstack.description = 'Creates a new moderator and stack.  Also logs in the moderator locally.';
    Createstack.examples = [
        '$ nostack createstack -u mod -s tempstack, -e franky+mod@gmail.com -w franky12$ -w letMeIn0! -l licensed2Kill'
    ];
    Createstack.flags = {
        help: command_1.flags.help({ char: 'h' }),
        // flag with a value (-n, --name=VALUE)
        // appDir: flags.string({char: 'a', description: 'name of application'}),
        stack: command_1.flags.string({ char: 's', description: 'stack' }),
        licenseId: command_1.flags.string({ char: 'l', description: 'license id for the organization of the user' }),
        user: command_1.flags.string({ char: 'u', description: 'moderator to create' }),
        email: command_1.flags.string({ char: 'e', description: 'moderator email' }),
        password: command_1.flags.string({ char: 'w', description: 'moderator password' }),
        // flag with no value (-f, --force)
        force: command_1.flags.boolean({ char: 'f' }),
    };
    return Createstack;
})();
exports.default = Createstack;
