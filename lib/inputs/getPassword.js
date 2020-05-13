"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPassword = void 0;
const promptUser_1 = require("./promptUser");
const testPassword = async (password) => {
    if (!password || password.length === 0)
        return 'No value returned.  Please enter a password now.';
    if (!password || password.length < 8)
        return 'Your password must be at least 8 characters';
    const upperCaseCheck = /(.*[A-Z].*)/;
    if (!upperCaseCheck.test(password))
        return 'The password must contain at least one capital letter';
    const digitCheck = /(.*[0-9].*)/;
    if (!digitCheck.test(password))
        return 'The password must contain at least one digit from 0 to 9';
    const specialCharacterCheck = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!specialCharacterCheck.test(password))
        return 'The password must contain at least one special character';
    return '';
};
async function getPassword(password) {
    let prompt = `Please enter a password of at least 8 characters,
          and make sure to include a number, a special character and an uppercase letter.`;
    if (password) {
        prompt = await testPassword(password);
    }
    if (prompt.length === 0)
        return password;
    return promptUser_1.promptUser('password', promptUser_1.promptTypes.PASSWORD, prompt, testPassword);
}
exports.getPassword = getPassword;
