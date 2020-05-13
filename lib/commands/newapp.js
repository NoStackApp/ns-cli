"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const createNoStackApp_1 = require("../apps/createNoStackApp");
const getAppDir_1 = require("../inputs/getAppDir");
const getBaseApp_1 = require("../inputs/getBaseApp");
const isRequired_1 = require("../inputs/isRequired");
// import {createNoStackApp} from '../apps/createNoStackApp'
let Newapp = /** @class */ (() => {
    class Newapp extends command_1.Command {
        // static args = [{name: 'file'}]
        async run() {
            const { flags } = this.parse(Newapp);
            const appDir = await getAppDir_1.getAppDir(flags.appDir) || '';
            if (!appDir)
                isRequired_1.isRequired('appDir', 'newapp', '-a');
            let baseApp = flags.baseApp || '';
            if (baseApp.length > 0)
                baseApp = await getBaseApp_1.getBaseApp(baseApp);
            const newAppTasks = await createNoStackApp_1.createNoStackApp(appDir, baseApp);
            await newAppTasks.run().catch((err) => {
                console.error(err);
            });
            // shell.exec(`/home/yisrael/projects/ns-cli/bin/create-no-stack-app "${appDir}"`)
        }
    }
    Newapp.description = 'create an empty new no-stack app.  Effectively combines create-react-app with apollo stuff and the no stack package.';
    Newapp.flags = {
        help: command_1.flags.help({ char: 'h' }),
        appDir: command_1.flags.string({ char: 'a', description: 'application directory' }),
        baseApp: command_1.flags.string({ char: 'b', description: 'directory of the base app to copy. If it does not exist, it is created.' }),
    };
    Newapp.examples = [
        '$ nostack newapp -a ~/temp/myapp -b ~/temp/baseapp',
    ];
    return Newapp;
})();
exports.default = Newapp;
