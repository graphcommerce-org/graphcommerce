"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = diff;
function isObject(val) {
    return typeof val === 'object' && val !== null;
}
function isArray(val) {
    return Array.isArray(val);
}
/** Simple diff function, retuns the values of the second object. */
function diff(item1, item2) {
    const item1Type = typeof item2;
    const item2Type = typeof item2;
    const isSame = item1Type === item2Type;
    // If the types aren't the same we always have a diff
    if (!isSame)
        return item2;
    if (isArray(item1) && isArray(item2)) {
        const res = item1.map((val, idx) => diff(val, item2[idx])).filter((val) => !!val);
        return res.length ? res : undefined;
    }
    if (isObject(item1) && isObject(item2)) {
        const entriesRight = Object.fromEntries(Object.entries(item1)
            .map(([key, val]) => [key, diff(val, item2[key])])
            .filter((entry) => !!entry[1]));
        const entriesLeft = Object.fromEntries(Object.entries(item2)
            .map(([key, val]) => [key, diff(item1[key], val)])
            .filter((entry) => !!entry[1]));
        const entries = { ...entriesRight, ...entriesLeft };
        return Object.keys(entries).length ? entries : undefined;
    }
    return item2 === item1 ? undefined : item2;
}
