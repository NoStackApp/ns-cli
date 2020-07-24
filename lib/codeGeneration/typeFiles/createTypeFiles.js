"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeFiles = void 0;
const constants_1 = require("../../constants");
const generateTypeFile_1 = require("./generateTypeFile");
async function generateFilesForType(currentStack, type, source, selectionRoot, root, sourceInfo, highestLevel) {
    const typeInfo = currentStack.types[type];
    const typeSourceInfo = typeInfo.sources[source];
    const { assnType, sourceUnit } = typeSourceInfo;
    let { nodeType } = typeSourceInfo;
    let { dataType } = typeInfo;
    if (selectionRoot === type)
        nodeType = constants_1.nodeTypes.ROOT;
    let formType = constants_1.formTypes.SINGLE_INSTANCE;
    if (type === root && type !== sourceInfo.selectedTree[highestLevel][0]) {
        console.log(`${type} is root for ${source}`);
        // this is the root, being used as the highest level component even though
        // it is not selected.  Therefore, it must be treated as a grouping in order to
        // show a list of true highest level components.
        formType = constants_1.formTypes.SINGLE_INSTANCE;
        dataType = constants_1.dataTypes.GROUPING;
        nodeType = constants_1.nodeTypes.ROOT;
    }
    const boilerPlateInfo = {
        formType,
        dataType,
        nodeType
    };
    // console.log(`*** typeName=${typeName}, assnType=${assnType}, nodeType=${nodeType}`)
    if (sourceUnit) {
        const selectionBoilerPlateInfo = {
            formType: constants_1.formTypes.SELECTION,
            dataType,
            nodeType: constants_1.nodeTypes.SELECTABLE,
        };
        await generateTypeFile_1.generateTypeFile(type, sourceUnit, selectionBoilerPlateInfo, currentStack);
    }
    await generateTypeFile_1.generateTypeFile(type, source, boilerPlateInfo, currentStack);
    // console.log(`assnType=${assnType}`)
    if (assnType !== constants_1.associationTypes.SINGLE_REQUIRED) {
        // console.log('assnType === associationTypes.MULTIPLE is true!')
        const creationBoilerPlateInfo = {
            formType: constants_1.formTypes.CREATION,
            dataType,
            nodeType
        };
        await generateTypeFile_1.generateTypeFile(type, source, creationBoilerPlateInfo, currentStack);
        const singularBoilerPlateInfo = {
            formType: constants_1.formTypes.LIST,
            dataType,
            nodeType
        };
        await generateTypeFile_1.generateTypeFile(type, source, singularBoilerPlateInfo, currentStack);
    }
}
async function createTypeFiles(sources, userClass, currentStack) {
    let sourceKeys = Object.keys(sources);
    let i;
    for (i = 0; i < sourceKeys.length; i++) {
        let source = sourceKeys[i];
        const sourceInfo = sources[source];
        const { owner } = sourceInfo;
        // console.log(`source=${source}, userClass=${userClass}`)
        if (owner !== userClass)
            continue;
        try {
            const highestLevel = 'highestLevel';
            let selectedTree = Object.assign({}, sourceInfo.selectedTree);
            const highestLevelList = selectedTree[highestLevel];
            let selectionRoot = highestLevelList[0];
            const root = sourceInfo.root;
            if (highestLevelList.length > 1) {
                selectedTree[root] = highestLevelList;
                sourceInfo.selectedTree[root] = highestLevelList;
                selectionRoot = root;
            }
            delete selectedTree[highestLevel];
            // console.log(`source ${source} sourceInfo.unitType=${sourceInfo.unitType}`)
            if (sourceInfo.unitType === constants_1.unitTypes.DATA_SOURCE)
                continue;
            const types = Object.keys(selectedTree);
            let j;
            for (j = 0; j < types.length; j++) {
                const type = types[j];
                // console.log(`*** typeName=${typeName}`)
                await generateFilesForType(currentStack, type, source, selectionRoot, root, sourceInfo, highestLevel);
            }
        }
        catch (sourceCreationError) {
            throw new Error(`error creating source ${source}: ${sourceCreationError}`);
        }
    }
}
exports.createTypeFiles = createTypeFiles;
