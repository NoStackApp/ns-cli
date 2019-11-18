"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const inflections_1 = require("../../tools/inflections");
exports.boilerPlateToDir = (type, formType) => {
    const mappingObject = {
        [constants_1.formTypes.SINGLE_INSTANCE]: inflections_1.singularName(type),
        [constants_1.formTypes.CREATION]: inflections_1.singularName(type) + 'CreationForm',
        [constants_1.formTypes.LIST]: inflections_1.pluralName(type),
        [constants_1.formTypes.SELECTION]: inflections_1.singularName(type) + 'Select',
    };
    return mappingObject[formType];
};
