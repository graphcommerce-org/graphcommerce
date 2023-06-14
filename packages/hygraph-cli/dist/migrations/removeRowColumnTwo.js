"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRowColumnTwo = void 0;
const client_1 = require("../client");
const removeRowColumnTwo = async (name, config) => {
    const client = (0, client_1.initClient)(config, name);
    client.deleteModel({ apiId: 'RowColumnTwo' });
    return client.run(true);
};
exports.removeRowColumnTwo = removeRowColumnTwo;
