"use strict";
// import {PJSON} from '@oclif/config'
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLicenseId = exports.licenseValid = void 0;
const genericApiCall_1 = require("../tools/genericApiCall");
const promptUser_1 = require("./promptUser");
async function licenseValid(licenseId) {
    // console.log(`in resetLicenseCall, userInfo:${JSON.stringify(userInfo)}`)
    let userInfo = {
        name: '',
        stack: '',
        password: '',
        email: '',
        licenseId: '',
        stackId: '',
        refreshToken: '',
        accessToken: '',
        id: '',
    };
    const query = `query {
      licenseValid(licenseId:"${licenseId}")
  }
  `;
    const returnedData = await genericApiCall_1.genericApiCall(query, userInfo);
    return returnedData.licenseValid;
}
exports.licenseValid = licenseValid;
const testLicenseId = async (licenseId) => {
    if (!licenseId || licenseId.length === 0)
        return 'Please enter your license now.';
    if (!await licenseValid(licenseId))
        return `The license numbers you entered, '${licenseId}', is either invalid or maxed out.
      Please check the number and try again.  If you think that there is a problem with your
      registration, please contact info@nostack.net.`;
    return '';
};
async function getLicenseId(licenseId) {
    let prompt = 'Please enter your complete license.';
    if (licenseId) {
        prompt = await testLicenseId(licenseId);
    }
    if (prompt.length === 0)
        return licenseId;
    return promptUser_1.promptUser('licenseId', promptUser_1.promptTypes.PASSWORD, prompt, testLicenseId);
}
exports.getLicenseId = getLicenseId;
