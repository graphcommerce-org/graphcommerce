"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractExports = exports.RUNTIME_VALUE = exports.UnsupportedValueError = exports.NoSuchDeclarationError = void 0;
class NoSuchDeclarationError extends Error {
}
exports.NoSuchDeclarationError = NoSuchDeclarationError;
function isIdentifier(node) {
    return node.type === 'Identifier';
}
function isBooleanLiteral(node) {
    return node.type === 'BooleanLiteral';
}
function isNullLiteral(node) {
    return node.type === 'NullLiteral';
}
function isStringLiteral(node) {
    return node.type === 'StringLiteral';
}
function isNumericLiteral(node) {
    return node.type === 'NumericLiteral';
}
function isArrayExpression(node) {
    return node.type === 'ArrayExpression';
}
function isObjectExpression(node) {
    return node.type === 'ObjectExpression';
}
function isKeyValueProperty(node) {
    return node.type === 'KeyValueProperty';
}
function isRegExpLiteral(node) {
    return node.type === 'RegExpLiteral';
}
function isTemplateLiteral(node) {
    return node.type === 'TemplateLiteral';
}
class UnsupportedValueError extends Error {
    /** @example `config.runtime[0].value` */
    path;
    constructor(message, paths) {
        super(message);
        // Generating "path" that looks like "config.runtime[0].value"
        let codePath;
        if (Array.isArray(paths)) {
            codePath = '';
            for (const path of paths) {
                if (path[0] === '[') {
                    // "array" + "[0]"
                    codePath += path;
                }
                else if (codePath === '') {
                    codePath = path;
                }
                else {
                    // "object" + ".key"
                    codePath += `.${path}`;
                }
            }
        }
        this.path = codePath;
    }
}
exports.UnsupportedValueError = UnsupportedValueError;
exports.RUNTIME_VALUE = Symbol('RUNTIME_VALUE');
function extractValue(node, path, optional = false) {
    if (isNullLiteral(node)) {
        return null;
    }
    if (isBooleanLiteral(node)) {
        // e.g. true / false
        return node.value;
    }
    if (isStringLiteral(node)) {
        // e.g. "abc"
        return node.value;
    }
    if (isNumericLiteral(node)) {
        // e.g. 123
        return node.value;
    }
    if (isRegExpLiteral(node)) {
        // e.g. /abc/i
        return new RegExp(node.pattern, node.flags);
    }
    if (isIdentifier(node)) {
        switch (node.value) {
            case 'undefined':
                return undefined;
            default:
                return exports.RUNTIME_VALUE;
            // throw new UnsupportedValueError(`Unknown identifier "${node.value}"`, path)
        }
    }
    else if (isArrayExpression(node)) {
        // e.g. [1, 2, 3]
        const arr = [];
        for (let i = 0, len = node.elements.length; i < len; i++) {
            const elem = node.elements[i];
            if (elem) {
                if (elem.spread) {
                    // e.g. [ ...a ]
                    return exports.RUNTIME_VALUE;
                    // throw new UnsupportedValueError(
                    //   'Unsupported spread operator in the Array Expression',
                    //   path,
                    // )
                }
                arr.push(extractValue(elem.expression, path && [...path, `[${i}]`], optional));
            }
            else {
                // e.g. [1, , 2]
                //         ^^
                arr.push(undefined);
            }
        }
        return arr;
    }
    else if (isObjectExpression(node)) {
        // e.g. { a: 1, b: 2 }
        const obj = {};
        for (const prop of node.properties) {
            if (!isKeyValueProperty(prop)) {
                // e.g. { ...a }
                return exports.RUNTIME_VALUE;
                // throw new UnsupportedValueError(
                //   'Unsupported spread operator in the Object Expression',
                //   path,
                // )
            }
            let key;
            if (isIdentifier(prop.key)) {
                // e.g. { a: 1, b: 2 }
                key = prop.key.value;
            }
            else if (isStringLiteral(prop.key)) {
                // e.g. { "a": 1, "b": 2 }
                key = prop.key.value;
            }
            else {
                return exports.RUNTIME_VALUE;
                // throw new UnsupportedValueError(
                //   `Unsupported key type "${prop.key.type}" in the Object Expression`,
                //   path,
                // )
            }
            obj[key] = extractValue(prop.value, path && [...path, key]);
        }
        return obj;
    }
    else if (isTemplateLiteral(node)) {
        // e.g. `abc`
        if (node.expressions.length !== 0) {
            // TODO: should we add support for `${'e'}d${'g'}'e'`?
            return exports.RUNTIME_VALUE;
            // throw new UnsupportedValueError('Unsupported template literal with expressions', path)
        }
        // When TemplateLiteral has 0 expressions, the length of quasis is always 1.
        // Because when parsing TemplateLiteral, the parser yields the first quasi,
        // then the first expression, then the next quasi, then the next expression, etc.,
        // until the last quasi.
        // Thus if there is no expression, the parser ends at the frst and also last quasis
        //
        // A "cooked" interpretation where backslashes have special meaning, while a
        // "raw" interpretation where backslashes do not have special meaning
        // https://exploringjs.com/impatient-js/ch_template-literals.html#template-strings-cooked-vs-raw
        const [{ cooked, raw }] = node.quasis;
        return cooked ?? raw;
    }
    else {
        return exports.RUNTIME_VALUE;
        // throw new UnsupportedValueError(`Unsupported node type "${node.type}"`, path)
    }
}
function extractExports(module) {
    const exports = {};
    const errors = [];
    for (const moduleItem of module.body) {
        switch (moduleItem.type) {
            case 'ExportAllDeclaration':
                errors.push('You can not use export * from a plugin, exports must be explicit');
                break;
            case 'ExportDefaultDeclaration':
                errors.push('You can not use default exports from a plugin, exports must be explicit');
                break;
            case 'ExportDeclaration':
                switch (moduleItem.declaration.type) {
                    case 'ClassDeclaration':
                    case 'FunctionDeclaration':
                        exports[moduleItem.declaration.identifier.value] = exports.RUNTIME_VALUE;
                        // node.identifier.value
                        break;
                    case 'VariableDeclaration':
                        moduleItem.declaration.declarations.forEach((decl) => {
                            if (isIdentifier(decl.id) && decl.init) {
                                exports[decl.id.value] = extractValue(decl.init, undefined, true);
                            }
                        });
                        break;
                }
        }
    }
    return [exports, errors];
}
exports.extractExports = extractExports;
