"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const createNoStackApp_1 = require("../apps/createNoStackApp");
const generateAppCode_1 = require("../codeGeneration/generateAppCode");
const getAppName_1 = require("../inputs/getAppName");
const getBaseApp_1 = require("../inputs/getBaseApp");
const getEmail_1 = require("../inputs/getEmail");
const getFlowSpec_1 = require("../inputs/getFlowSpec");
const getLicenseId_1 = require("../inputs/getLicenseId");
const getModeratorName_1 = require("../inputs/getModeratorName");
const getPassword_1 = require("../inputs/getPassword");
const getStackName_1 = require("../inputs/getStackName");
const isRequired_1 = require("../inputs/isRequired");
const buildStackFromTemplate_1 = require("../stacks/buildStackFromTemplate");
const create_stack_and_moderator_1 = require("../stacks/create-stack-and-moderator");
const errorMessage_1 = require("../tools/errorMessage");
const fs = require('fs-extra');
const Listr = require('listr');
class Quickstarter extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(Quickstarter);
        let baseApp = flags.baseApp || '';
        if (baseApp.length > 0)
            baseApp = await getBaseApp_1.getBaseApp(baseApp);
        const email = await getEmail_1.getEmail(flags.email);
        if (!email)
            isRequired_1.isRequired('email', 'quickstarter', '-e');
        const stack = await getStackName_1.getStackName(flags.stack);
        if (!stack)
            isRequired_1.isRequired('stack', 'quickstarter', '-s');
        const user = await getModeratorName_1.getModeratorName(flags.user);
        if (!user)
            isRequired_1.isRequired('user', 'quickstarter', '-u');
        const appName = await getAppName_1.getAppName(flags.appName) || '';
        if (!appName)
            isRequired_1.isRequired('appName', 'quickstarter', '-a');
        const flowSpec = await getFlowSpec_1.getFlowSpec(flags.template) || '';
        if (!flowSpec)
            isRequired_1.isRequired('flowSpec', 'quickstarter', '-t');
        const licenseId = await getLicenseId_1.getLicenseId(flags.licenseId);
        if (!licenseId)
            isRequired_1.isRequired('licenseId', 'quickstarter', '-l');
        const password = await getPassword_1.getPassword(flags.password);
        if (!password)
            isRequired_1.isRequired('password', 'quickstarter', '-w');
        const userClass = flags.userClass || isRequired_1.isRequired('userClass', 'quickstarter', '-c');
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
        const newAppTasks = await createNoStackApp_1.createNoStackApp(appName, baseApp);
        const newStackTasks = await create_stack_and_moderator_1.createStackAndModerator(userInfo);
        const generateAppTasks = await generateAppCode_1.generateAppCode(appName, userClass);
        // @ts-ignore
        const tasks = new Listr([
            {
                title: 'Create a Base NoStack App',
                task: async () => newAppTasks
            },
            {
                title: 'Create an Empty Stack',
                task: async () => newStackTasks
            },
            {
                title: 'Build Stack from Template',
                task: async () => {
                    // const json = await buildStackFromTemplate_1.buildStackFromTemplate(template, userInfo, email, addedSuffix);
                    // await fs.outputJson(`${appName}/stack.json`, JSON.parse(json), (err) => {
                    //   if (err) {
                    //     // @ts-ignore
                    //     throw new Error(console.error(err));
                    //   }
                    // });
                    //
                    const json = await buildStackFromTemplate_1.buildStackFromTemplate(flowSpec, userInfo, email, '');
                    const stackFile = `${appName}/stack.json`;
                    await fs.outputJson(stackFile, JSON.parse(json));
                    const isStackFile = await fs.pathExists(stackFile);
                    if (!isStackFile) {
                        throw new Error(errorMessage_1.errorMessage('stack file was not generated on the front end.'));
                    }
                }
            },
            {
                title: 'Generate Front End Code',
                task: async () => generateAppTasks,
            },
        ]);
        await tasks.run().catch((err) => {
            console.error(err);
        });
        if (args.file) {
            this.log(`you input --file: ${args.file}`);
        }
    }
}
exports.default = Quickstarter;
Quickstarter.description = 'Creates a new moderator and stack.  Also logs in the moderator locally.';
Quickstarter.examples = [
    '$ nostack quickstarter -u franky -s tempstack, -e franky@gmail.com -w franky12$ -a myapp -b ~/temp/baseApp -t appFlow.txt -l ABC$$123 -c buyer',
];
Quickstarter.flags = {
    help: command_1.flags.help({ char: 'h' }),
    appName: command_1.flags.string({ char: 'a', description: 'name of application' }),
    baseApp: command_1.flags.string({ char: 'b', description: 'directory of the base app to copy.' }),
    stack: command_1.flags.string({ char: 's', description: 'stack' }),
    template: command_1.flags.string({ char: 't', description: 'app flow spec from which to spin up a stack' }),
    licenseId: command_1.flags.string({ char: 'l', description: 'license id for the organization of the user' }),
    user: command_1.flags.string({ char: 'u', description: 'moderator to create' }),
    email: command_1.flags.string({ char: 'e', description: 'moderator email' }),
    password: command_1.flags.string({ char: 'w', description: 'moderator password' }),
    userClass: command_1.flags.string({ char: 'c', description: 'userClass for which to generate an app' }),
};
Quickstarter.args = [];
