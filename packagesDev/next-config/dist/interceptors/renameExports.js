"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeExports = void 0;
const core_1 = require("@swc/core");
function removeExports(source, replaceFromTo) {
    const ast = (0, core_1.parseSync)(source, { syntax: 'typescript', tsx: true });
    for (let i = 0; i < ast.body.length; i++) {
        const node = ast.body[i];
        if (node.type === 'ExportDeclaration') {
            switch (node.declaration.type) {
                case 'ClassDeclaration':
                case 'FunctionDeclaration':
                    if (node.declaration.identifier.value === findExport)
                        return resolved;
                    break;
                case 'VariableDeclaration':
                    for (const declaration of node.declaration.declarations) {
                        if (declaration.type === 'VariableDeclarator') {
                            if (declaration.id.type === 'Identifier') {
                                if (declaration.id.value === findExport)
                                    return resolved;
                            }
                            else {
                                console.log(declaration);
                            }
                        }
                    }
                    break;
            }
        }
    }
    return (0, core_1.printSync)(ast).code;
}
exports.removeExports = removeExports;
