"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUserInfo = void 0;
exports.newUserInfo = (name) => {
    return {
        name,
        stack: '',
        password: '',
        email: '',
        stackId: '',
        refreshToken: '',
        accessToken: '',
        id: '',
        licenseId: '',
    };
};
