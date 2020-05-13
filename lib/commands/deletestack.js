"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const getUserInfo_1 = require("../auth/getUserInfo");
const newUserInfo_1 = require("../auth/newUserInfo");
const isRequired_1 = require("../inputs/isRequired");
const delete_stack_and_moderator_1 = require("../stacks/delete-stack-and-moderator");
let Deletestack = /** @class */ (() => {
    class Deletestack extends command_1.Command {
        async run() {
            const { flags } = this.parse(Deletestack);
            const stack = flags.stack || isRequired_1.isRequired('stack', 'deletestack', '-s');
            const user = flags.user || isRequired_1.isRequired('user', 'deletestack', '-u');
            let userInfo = newUserInfo_1.newUserInfo(user);
            userInfo.stack = stack;
            userInfo = await getUserInfo_1.getUserInfo(userInfo);
            // console.log(`userInfo:${JSON.stringify(userInfo)}`)
            const deleteStackTasks = await delete_stack_and_moderator_1.deleteStackAndModerator(userInfo);
            await deleteStackTasks.run().catch((err) => {
                throw new Error(err);
            });
            console.log(`The stack ${stack} and its moderator ${user} have been deleted.`);
        }
    }
    Deletestack.description = 'Deletes a moderator and stack.  Must be called by the moderator.';
    Deletestack.examples = [
        '$ nostack deletestack -u mod -s tempstack'
    ];
    Deletestack.flags = {
        help: command_1.flags.help({ char: 'h' }),
        stack: command_1.flags.string({ char: 's', description: 'stack' }),
        user: command_1.flags.string({ char: 'u', description: 'moderator to delete' }),
    };
    Deletestack.args = [];
    return Deletestack;
})();
exports.default = Deletestack;
