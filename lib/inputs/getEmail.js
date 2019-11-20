"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promptUser_1 = require("./promptUser");
let Isemail = require('isemail');
const testEmail = async (email) => {
    if (!Isemail.validate(email))
        return 'invalid email.  please try again';
    return '';
};
async function getEmail(email) {
    let prompt = 'Please enter the email address for the moderator.';
    if (email) {
        prompt = await testEmail(email);
    }
    if (prompt.length === 0)
        return email;
    return promptUser_1.promptUser('email', promptUser_1.promptTypes.TEXT, prompt, testEmail);
}
exports.getEmail = getEmail;
