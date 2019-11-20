"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts = require('prompts');
exports.promptTypes = {
    TEXT: 'text',
    NUMBER: 'number',
    PASSWORD: 'password',
};
// tslint:disable-next-line:ban-types
exports.promptUser = async (paramName, promptType, message, testValue) => {
    let returnValue = null;
    let promptResults = null;
    let abort = false;
    let prompt = message;
    const onCancel = () => {
        abort = true;
    };
    while (!returnValue) {
        if (abort)
            return null;
        try {
            promptResults = await prompts({
                type: promptType,
                name: paramName,
                message: prompt,
            }, { onCancel });
            returnValue = promptResults[paramName];
            // console.log(`returnValue=${JSON.stringify(returnValue)}`)
            prompt = await testValue(returnValue);
            if (prompt.length === 0)
                return returnValue;
            returnValue = null;
        }
        catch (err) {
            console.log(`error: ${err}`);
            return null;
        }
    }
    return returnValue;
};
