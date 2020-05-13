"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlowSpec = void 0;
const promptUser_1 = require("./promptUser");
const fs = require('fs-extra');
const testFlowSpec = async (flowSpec) => {
    if (!flowSpec || flowSpec.length === 0)
        return 'Please enter a name for your app (all numbers and lowercase letters, no spaces).';
    if (!await fs.pathExists(flowSpec))
        return `The flow spec file that you provided, '${flowSpec}', does not exist.
    Please enter a new name or add the file '${flowSpec}' now.`;
    return '';
};
async function getFlowSpec(flowSpec) {
    let prompt = 'Please enter your flow spec file.';
    if (flowSpec) {
        prompt = await testFlowSpec(flowSpec);
    }
    if (prompt.length === 0)
        return flowSpec;
    return promptUser_1.promptUser('flowSpec', promptUser_1.promptTypes.TEXT, prompt, testFlowSpec);
}
exports.getFlowSpec = getFlowSpec;
