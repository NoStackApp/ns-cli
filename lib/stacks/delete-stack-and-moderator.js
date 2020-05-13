"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStackAndModerator = void 0;
const Listr = require('listr');
const delete_stack_query_1 = require("./delete-stack-query");
async function deleteStackAndModerator(userInfo) {
    const tasks = new Listr([
        {
            title: 'Delete the Stack',
            task: async () => {
                await delete_stack_query_1.deleteStackQuery(userInfo);
            }
        },
    ]);
    return tasks;
}
exports.deleteStackAndModerator = deleteStackAndModerator;
