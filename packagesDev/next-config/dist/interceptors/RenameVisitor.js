"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameVisitor = void 0;
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
            n.value = this.suffix(n.value);
        return n;
    }
}
exports.RenameVisitor = RenameVisitor;
