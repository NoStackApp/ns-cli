"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const createNoStackApp_1 = require("../apps/createNoStackApp");
const generateAppCode_1 = require("../codeGeneration/generateAppCode");
const getAppDir_1 = require("../inputs/getAppDir");
const getBaseApp_1 = require("../inputs/getBaseApp");
const getEmail_1 = require("../inputs/getEmail");
const getFlowSpec_1 = require("../inputs/getFlowSpec");
const getLicenseId_1 = require("../inputs/getLicenseId");
const getNewModeratorName_1 = require("../inputs/getNewModeratorName");
const getNewStackName_1 = require("../inputs/getNewStackName");
const getPassword_1 = require("../inputs/getPassword");
const isRequired_1 = require("../inputs/isRequired");
const buildStackFromTemplate_1 = require("../stacks/buildStackFromTemplate");
const create_stack_and_moderator_1 = require("../stacks/create-stack-and-moderator");
const errorMessage_1 = require("../tools/errorMessage");
const fs = require('fs-extra');
const Listr = require('listr');
let Quickstarter = /** @class */ (() => {
    class Quickstarter extends command_1.Command {
        async run() {
            const { args, flags } = this.parse(Quickstarter);
            let baseApp = flags.baseApp || '';
            if (baseApp.length > 0)
                baseApp = await getBaseApp_1.getBaseApp(baseApp);
            const jsonPath = flags.jsonPath || isRequired_1.isRequired('json', 'quickstarter', '-j');
            const email = await getEmail_1.getEmail(flags.email);
            if (!email)
                isRequired_1.isRequired('email', 'quickstarter', '-e');
            const stack = await getNewStackName_1.getNewStackName(flags.stack);
            if (!stack)
                isRequired_1.isRequired('stack', 'quickstarter', '-s');
            const user = await getNewModeratorName_1.getNewModeratorName(flags.user);
            if (!user)
                isRequired_1.isRequired('user', 'quickstarter', '-u');
            const appDir = await getAppDir_1.getAppDir(flags.appDir) || '';
            if (!appDir)
                isRequired_1.isRequired('appDir', 'quickstarter', '-a');
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
            const newAppTasks = await createNoStackApp_1.createNoStackApp(appDir, baseApp);
            const newStackTasks = await create_stack_and_moderator_1.createStackAndModerator(userInfo);
            const generateAppTasks = await generateAppCode_1.generateAppCode(appDir, userClass, jsonPath);
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
                        // await fs.outputJson(`${appDir}/stack.json`, JSON.parse(json), (err) => {
                        //   if (err) {
                        //     // @ts-ignore
                        //     throw new Error(console.error(err));
                        //   }
                        // });
                        //
                        const json = await buildStackFromTemplate_1.buildStackFromTemplate(flowSpec, userInfo, email, '');
                        await fs.outputJson(jsonPath, JSON.parse(json));
                        const isStackFile = await fs.pathExists(jsonPath);
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
    Quickstarter.description = 'Creates a new moderator and stack.  Also logs in the moderator locally.';
    Quickstarter.examples = [
        '$ nostack quickstarter -u franky -s tempstack, -e franky@gmail.com -w franky12$ -a ~/temp/myapp -b ~/temp/baseApp -j ~/temp/stack.json -t appFlow.txt -l ABC$$123 -c buyer',
    ];
    Quickstarter.flags = {
        help: command_1.flags.help({ char: 'h' }),
        appDir: command_1.flags.string({ char: 'a', description: 'path and directory of application' }),
        stack: command_1.flags.string({ char: 's', description: 'stack' }),
        template: command_1.flags.string({ char: 't', description: 'app flow spec from which to spin up a stack' }),
        licenseId: command_1.flags.string({ char: 'l', description: 'license id for the organization of the user' }),
        user: command_1.flags.string({ char: 'u', description: 'moderator to create' }),
        email: command_1.flags.string({ char: 'e', description: 'moderator email' }),
        password: command_1.flags.string({ char: 'w', description: 'moderator password' }),
        userClass: command_1.flags.string({ char: 'c', description: 'userClass for which to generate an app' }),
        jsonPath: command_1.flags.string({ char: 'j', description: 'path and filename for the stack json file.  The file tells you about your server and gets used to generate code for front end apps.' }),
        baseApp: command_1.flags.string({ char: 'b', description: 'path and directory of the base app to copy.' }),
    };
    Quickstarter.args = [];
    return Quickstarter;
})();
exports.default = Quickstarter;
