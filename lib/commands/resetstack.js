"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const getUserInfo_1 = require("../auth/getUserInfo");
const newUserInfo_1 = require("../auth/newUserInfo");
const getModeratorName_1 = require("../inputs/getModeratorName");
const getStackName_1 = require("../inputs/getStackName");
const isRequired_1 = require("../inputs/isRequired");
const resetStackCall_1 = require("../stacks/resetStackCall");
class Resetstack extends command_1.Command {
    async run() {
        const { flags } = this.parse(Resetstack);
        const stack = await getStackName_1.getStackName(flags.stack);
        if (!stack)
            isRequired_1.isRequired('stack', 'resetstack', '-s');
        const user = await getModeratorName_1.getModeratorName(flags.user);
        if (!user)
            isRequired_1.isRequired('user', 'resetstack', '-u');
        let userInfo = newUserInfo_1.newUserInfo(user);
        userInfo.stack = stack;
        // console.log(`in resetstack, userInfo:${JSON.stringify(userInfo)}`)
        userInfo = await getUserInfo_1.getUserInfo(userInfo);
        // console.log(`in resetstack after getUserInfo, userInfo:${JSON.stringify(userInfo)}`)
        const isReset = await resetStackCall_1.resetStackCall(userInfo);
        if (isReset) {
            this.log(`The stack ${stack} has been reset.`);
        }
    }
}
exports.default = Resetstack;
Resetstack.description = 'Resets the stack, meaning that the moderator remains and the stack is completely empty.  ' +
    "Essentially returns the status to before 'spinstack'.  WARNING: this is not reversable and will remove EVERYTHING, including your users!!!!";
Resetstack.flags = {
    help: command_1.flags.help({ char: 'h' }),
    stack: command_1.flags.string({ char: 's', description: 'stack' }),
    user: command_1.flags.string({ char: 'u', description: 'moderator for stack' }),
};
