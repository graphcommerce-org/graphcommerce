"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envDirective = void 0;
const graphql_1 = require("graphql");
/**
 * Implements the env directive:
 *
 *     directive @env(if: String!) on FRAGMENT_DEFINITION
 */
function envDirective(documentFiles) {
    return documentFiles.filter((documentFile) => {
        if (!documentFile.document)
            return true;
        let keep = true;
        documentFile.document = (0, graphql_1.visit)(documentFile.document, {
            Directive: (node) => {
                if (node.name.value === 'env') {
                    const ifValue = node.arguments?.find((arg) => arg.name.value === 'if')?.value;
                    keep = ifValue?.kind === graphql_1.Kind.STRING && typeof process.env[ifValue.value] !== 'undefined';
                    // Remove the @env directive, since it is only used here
                    return null;
                }
                return undefined;
            },
        });
        return keep;
    });
}
exports.envDirective = envDirective;
