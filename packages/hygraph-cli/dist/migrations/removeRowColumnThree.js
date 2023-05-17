"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRowColumnThree = void 0;
const client_1 = require("../client");
const removeRowColumnThree = async (name) => {
    const client = (0, client_1.initClient)(name);
    client.deleteModel({ apiId: 'RowColumnThree' });
    return client.run(true);
};
exports.removeRowColumnThree = removeRowColumnThree;
