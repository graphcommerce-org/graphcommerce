"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeExports = void 0;
const core_1 = require("@swc/core");
const Visitor_1 = require("./Visitor");
class RenameVisitor extends Visitor_1.Visitor {
    replace;
    suffix;
    constructor(replace, suffix) {
        super();
        this.replace = replace;
        this.suffix = suffix;
    }
    visitIdentifier(n) {
        if (this.replace.includes(n.value))
            n.value += this.suffix;
        return n;
    }
}
function removeExports(source, replace, suffix) {
    const ast = (0, core_1.parseSync)(source, { syntax: 'typescript', tsx: true, comments: true });
    new RenameVisitor(replace, suffix).visitModule(ast);
    return (0, core_1.printSync)(ast).code;
}
exports.removeExports = removeExports;
