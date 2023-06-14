"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRowColumnOne = void 0;
const client_1 = require("../client");
const removeRowColumnOne = async (name, config) => {
    const client = (0, client_1.initClient)(config, name);
    client.deleteModel({ apiId: 'RowColumnOne' });
    return client.run(true);
};
exports.removeRowColumnOne = removeRowColumnOne;
